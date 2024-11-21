import { PutObjectCommand } from "@aws-sdk/client-s3"
import { assert } from "@std/assert"
import { decodeBase64 } from "@std/encoding"
import { Context } from "../Context.ts"

export async function generateImage(ctx: Context) {
  const response = await ctx.oai.images.generate({
    model: "dall-e-3",
    prompt: "a white siamese cat",
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  })
  const image = response.data[0]
  assert(image?.b64_json)
  const data = decodeBase64(image.b64_json)
  const command = new PutObjectCommand({
    Bucket: "crosshatching",
    Body: data,
    Key: "",
    ContentType: "image/jpeg",
  })
  await ctx.s3.send(command as never)
  console.log(data)
}
