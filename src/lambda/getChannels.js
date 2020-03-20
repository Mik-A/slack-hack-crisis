import axios from 'axios'

export async function handler(event, context) {
  const token =
    'xoxp-998425034449-1011950159975-1014308500070-52bf485d951b0deec9303c6316d1ba77' // process.env.NODE_ENV_TOKEN
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
