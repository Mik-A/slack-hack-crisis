const axios = require('axios')
// const fs = require('fs')

async function getUser() {
  try {
    const response = await axios.get(
      'https://slack.com/api/channels.history?token=xoxp-998425034449-1011950159975-1014308500070-52bf485d951b0deec9303c6316d1ba77&channel=C01087KPKQU&pretty=1'
    )
    console.log(response.data.messages.map((x) => x.text))
  } catch (error) {
    console.error(error)
  }
}
getUser()
