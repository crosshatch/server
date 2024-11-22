import { STATUS_CODE, STATUS_TEXT } from "@std/http"
import { Context, loadEnv, methods } from "api"
import { handleShape } from "./handlers/shape.ts"

const ctx = new Context(await loadEnv())

await Deno.serve({
  port: +ctx.port,
  onListen({ hostname, port }) {
    console.log(`Listening at http://${hostname}:${port}`)
  },
}, handler).finished

async function handler(req: Request) {
  const method = { GET, POST }[req.method]
  return (await method?.(req)) ??
    (() => {
      const status = STATUS_CODE["NotFound"]
      return new Response(STATUS_TEXT[status], { status })
    })()
}

function GET(req: Request) {
  const match = new URLPattern({ pathname: "/v1/shape" }).exec(req.url)
  if (match) {
    return handleShape(ctx, req)
  }
  if (new URL(req.url).pathname === "/") {
    return new Response("Crosshatch server v1")
  }
}

async function POST(req: Request) {
  const match = new URLPattern({ pathname: "/v1" }).exec(req.url)
  if (match) {
    const args = await req.json()
    const ns = methods[args.ns as keyof typeof methods]
    const f = ns[args.f as keyof typeof ns]
    try {
      return await f(ctx, args).then(Response.json)
    } catch (_e: unknown) {
      const status = STATUS_CODE["InternalServerError"]
      return new Response(STATUS_TEXT[status], { status })
    }
  }
}
