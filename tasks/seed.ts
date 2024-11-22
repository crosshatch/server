import { en, Faker } from "@faker-js/faker"
import { Context, loadEnv } from "api"
import dedent from "dedent"
import { Insertable } from "kysely"
import { Agents, Illustrations, RealmAgents, Realms } from "schema"
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
const owner_id = agentIds[0]!.agent_id

const realms: Insertable<Realms>[] = Array.from({ length: 16 }, () => ({
  title: faker.book.title(),
  description: dedent`
    Shreveport is a city in northwest Louisiana. Downtown, the Sci-Port Discovery Center
    features an IMAX dome and hands-on science exhibits. Spring Street Historical Museum
    explores local history in a restored 19th-century bank. Riverboat casinos dot the Red
    River. Surrounded by gardens and trails, R.W. Norton Art Gallery displays paintings,
    sculpture and rare books.
  `,
}))
await ctx.db.insertInto("realms").values(realms).execute()
const realmIds = await ctx.db.selectFrom("realms").select("realm_id").execute()

const realm_agents: Insertable<RealmAgents>[] = realmIds.flatMap(({ realm_id }) => {
  const nAgents = Math.floor(Math.random() * 16) + 1
  return sampleElements(agentIds, nAgents).map(({ agent_id }) => ({ realm_id, agent_id }))
})
await ctx.db.insertInto("realm_agents").values(realm_agents).execute()

const illustrations: Insertable<Illustrations>[] = realmIds.flatMap(({ realm_id }, realmI) =>
  Array.from({ length: 8 }, (_, photoI): Insertable<Illustrations> => ({
    realm_id,
    owner_id,
    uri: `https://picsum.photos/id/${(realmI * 8) + photoI}/512`,
  }))
)
await ctx.db.insertInto("illustrations").values(illustrations).execute()
