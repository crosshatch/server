import type { Context } from "api"

export async function handleShape(_ctx: Context, req: Request) {
  const url = new URL(req.url)
  const upstream = new URL("http://localhost:3000/v1/shape")
  url.searchParams.forEach((value, key) => {
    if (IS_PARAM[key]) {
      upstream.searchParams.set(key, value)
    }
  })

  //  const user = await loadUser(request.headers.get(`authorization`))

  let upstreamRes = await fetch(upstream.toString())
  if (upstreamRes.headers.get("content-encoding")) {
    const headers = new Headers(upstreamRes.headers)
    headers.delete("content-encoding")
    headers.delete("content-length")
    upstreamRes = new Response(upstreamRes.body, {
      status: upstreamRes.status,
      statusText: upstreamRes.statusText,
      headers,
    })
  }
  return upstreamRes
}

const IS_PARAM: Record<string, true> = {
  live: true,
  table: true,
  handle: true,
  offset: true,
  cursor: true,
}
