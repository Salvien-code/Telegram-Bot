import dotenv from "dotenv"
import  Express  from "express"
import axios from "axios"
import bodyParser from "body-parser"

dotenv.config()

const TOKEN = process.env.TOKEN
const SERVER_URL = process.env.SERVER_URL
const TELEGRAM_API = "https://api.telegram.org/bot" + TOKEN

const URI = "/webhook/" + TOKEN
const WEBHOOK_URL = SERVER_URL + URI

const app = Express()
app.use(bodyParser.json())

const init = await axios.get(TELEGRAM_API+"/setWebhook?url="+WEBHOOK_URL)
console.log(init.data)

app.post(URI, async (req, res) => {
  console.log(req.body)

  const chatID = req.body.message.chat.id
  const text = "Don't stress me please."

  await axios.post(TELEGRAM_API+"/sendMessage", () => {
    chat_id: chatID;
    text: text
  })
  return res.send()
})

app.listen(process.env.PORT || 5000, async () => {
  await console.log("App running on port", process.env.PORT || 5000)
  await init
})