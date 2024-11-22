-- migrate:up
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE agent_type AS ENUM('user', 'avatar', 'ai');

CREATE TABLE IF NOT EXISTS agents (
  agent_id UUID NOT NULL DEFAULT uuid_generate_v4 (),
  agent_type agent_type NOT NULL,
  name TEXT NOT NULL,
  CONSTRAINT agents_pk PRIMARY KEY (agent_id)
);

CREATE TABLE IF NOT EXISTS realms (
  realm_id UUID NOT NULL DEFAULT uuid_generate_v4 (),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  CONSTRAINT realms_pk PRIMARY KEY (realm_id)
);

CREATE TABLE IF NOT EXISTS illustrations (
  illustration_id UUID NOT NULL DEFAULT uuid_generate_v4 (),
  uri TEXT NOT NULL,
  owner_id UUID NOT NULL,
  realm_id UUID NOT NULL
);

CREATE TABLE IF NOT EXISTS realm_agents (
  realm_id UUID NOT NULL,
  agent_id UUID NOT NULL,
  PRIMARY KEY (realm_id, agent_id),
  FOREIGN KEY (realm_id) REFERENCES realms (realm_id) ON DELETE CASCADE,
  FOREIGN KEY (agent_id) REFERENCES agents (agent_id) ON DELETE CASCADE
);

-- Non-agents / forces? Natural disasters, gravity, pandemic, misc.
CREATE TABLE IF NOT EXISTS EVENTS (
  event_id UUID NOT NULL DEFAULT uuid_generate_v4 ()
);

CREATE TABLE IF NOT EXISTS contexts (
  context_id UUID NOT NULL DEFAULT uuid_generate_v4 (),
  name TEXT NOT NULL,
  resource TEXT NOT NULL,
  CONSTRAINT contexts_pk PRIMARY KEY (context_id)
);

-- migrate:down
