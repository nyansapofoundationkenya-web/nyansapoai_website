import africastalking from "africastalking"

const client =
  process.env.AT_USERNAME && process.env.AT_API_KEY
    ? africastalking({
        username: process.env.AT_USERNAME,
        apiKey: process.env.AT_API_KEY,
      })
    : null

export default client