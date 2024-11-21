import { SendEmailCommand, type SESv2Client } from "@aws-sdk/client-sesv2"

export async function sendEmail(ses: SESv2Client, { from, subject, body, to }: {
  from: string
  subject: string
  body: string
  to: string[]
}) {
  await ses.send(
    new SendEmailCommand({
      FromEmailAddress: from,
      Content: {
        Simple: {
          Subject: {
            Data: subject,
            Charset: "utf-8",
          },
          Body: {
            Text: {
              Data: body,
              Charset: "utf-8",
            },
          },
        },
      },
      Destination: { ToAddresses: to },
    }),
  )
}
