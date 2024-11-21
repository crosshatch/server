import { S3Client } from "@aws-sdk/client-s3"
import { SESv2Client } from "@aws-sdk/client-sesv2"
import Openai from "openai"
import { db } from "./db.ts"
import { Env } from "./env.ts"

export class Context {
  port
  db
  oai
  s3
  ses
  constructor(
    { PORT, DATABASE_URL, OPENAI_API_KEY, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY }: Env,
  ) {
    this.port = parseInt(PORT)
    this.db = db(DATABASE_URL)
    this.oai = new Openai({ apiKey: OPENAI_API_KEY })

    const creds = {
      region: "us-east-2",
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    }
    this.s3 = new S3Client(creds)
    this.ses = new SESv2Client(creds)
  }

  [Symbol.dispose]() {
    return this.db.destroy()
  }
}
