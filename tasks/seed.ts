import { en, Faker } from "@faker-js/faker"
import { Context, loadEnv } from "api"
import { Insertable } from "kysely"
import { Agents, RealmAgents, Realms } from "schema"
import { sampleElements } from "../util/sampleElements.ts"

using ctx = new Context(await loadEnv())

const faker = new Faker({ locale: [en] })

const agents: Insertable<Agents>[] = [
  {
    agent_type: "user",
    name: "Harry Solovay",
  },
  ...Array.from({ length: 16 }, () => ({
    agent_type: "ai" as const,
    name: faker.person.fullName(),
  })),
]
await ctx.db.insertInto("agents").values(agents).execute()
const agentIds = await ctx.db.selectFrom("agents").select("agent_id").execute()

const realms: Insertable<Realms>[] = Array.from({ length: 16 }, () => ({
  authority_id: agentIds[0]!.agent_id,
  title: faker.book.title(),
  cover: faker.image.avatar(),
}))
await ctx.db.insertInto("realms").values(realms).execute()
const realmIds = await ctx.db.selectFrom("realms").select("realm_id").execute()

const realm_agents: Insertable<RealmAgents>[] = realmIds.flatMap(({ realm_id }) => {
  const nAgents = Math.floor(Math.random() * 16) + 1
  return sampleElements(agentIds, nAgents).map(({ agent_id }) => ({ realm_id, agent_id }))
})
await ctx.db.insertInto("realm_agents").values(realm_agents).execute()
