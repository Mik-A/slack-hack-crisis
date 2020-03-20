import axios from 'axios'
// import WebClient from '@slack/web-api'

export async function handler(event, context) {
  // const web = new WebClient(token)
  const token = process.env.NODE_ENV_TOKEN
  const params = JSON.parse(event.body)
  const channel = params.channel
  try {
    const response = await axios.get(
      `https://slack.com/api/channels.history?token=${token}&channel=${channel}&pretty=1`
    )
    const messages = response.data.messages
    const previewText = 'Excerpt: ' // + texts[0].slice(0, 180) + '...'
    const textsOnlyArr = messages.map((x) => x.text)
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: previewText, textsOnlyArr })
    }
  } catch (error) {
    console.error(error)
  }
}
