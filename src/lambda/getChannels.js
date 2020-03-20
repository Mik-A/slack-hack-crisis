import axios from 'axios'

export async function handler(event, context) {
  const token = process.env.NODE_ENV_TOKEN
  try {
    const list = await axios.get(
      `https://slack.com/api/conversations.list?token=${token}&pretty=1`
    )
    return {
      statusCode: 200,
      body: JSON.stringify({ list: list.data })
    }
  } catch (error) {
    console.error(error)
  }
}
