-- migrate:up
CREATE EXTENSION if NOT EXISTS "uuid-ossp";

CREATE TYPE agent_type AS ENUM('user', 'avatar', 'ai');

CREATE TABLE IF NOT EXISTS agents (
  agent_id UUID NOT NULL DEFAULT uuid_generate_v4 (),
  agent_type agent_type NOT NULL,
  name TEXT NOT NULL,
  CONSTRAINT agents_pk PRIMARY KEY (agent_id)
);

CREATE TABLE IF NOT EXISTS realms (
  realm_id UUID NOT NULL DEFAULT uuid_generate_v4 (),
  authority_id UUID NOT NULL,
  title TEXT NOT NULL,
  cover TEXT NOT NULL,
  CONSTRAINT realms_pk PRIMARY KEY (realm_id),
  FOREIGN key (authority_id) REFERENCES agents (agent_id)
);

CREATE TABLE IF NOT EXISTS realm_agents (
  realm_id UUID NOT NULL,
  agent_id UUID NOT NULL,
  PRIMARY KEY (realm_id, agent_id),
  FOREIGN key (realm_id) REFERENCES realms (realm_id) ON DELETE cascade,
  FOREIGN key (agent_id) REFERENCES agents (agent_id) ON DELETE cascade
);

-- Non-agents / forces? Natural disasters, gravity, pandemic, misc.
CREATE TABLE IF NOT EXISTS events (
  event_id UUID NOT NULL DEFAULT uuid_generate_v4 ()
);

CREATE TABLE IF NOT EXISTS contexts (
  context_id UUID NOT NULL DEFAULT uuid_generate_v4 (),
  name TEXT NOT NULL,
  resource TEXT NOT NULL,
  CONSTRAINT contexts_pk PRIMARY KEY (context_id)
);

-- migrate:down
