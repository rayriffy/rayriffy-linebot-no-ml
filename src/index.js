import * as functions from 'firebase-functions'
import dotenv from 'dotenv'
import rp from 'request-promise'

dotenv.config()

const LINE_API_URL = 'https://api.line.me/v2/bot/message'
const REQUEST_HEADER = {
  'Content-Type': `application/json`,
  Authorization: `Bearer ` + process.env.LINE_ACCESS_TOKEN,
}

export let test = functions.https.onRequest((req, res) => {
  console.log(req.body)
  res.status(200).send(`OK`)
})
