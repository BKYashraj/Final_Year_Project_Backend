// yashrajdesale1
// vwY1CUU1RE6vTvjL
const express = require('express')  // dependancies call 
const bodyParser = require('body-parser')
const ServerConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')

const app = express() // Got express server object

// If request is in JSON, text, urlencoded it correctly reads by Express Server
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());


app.post('/ping', (req, res) => {
  return res.json({message:"pong"})
});

app.listen(ServerConfig.PORT, async () => {
  await connectDB();
  console.log(`Example app listening on port ${ServerConfig.PORT}...`)
})

// git remote add new-origin <new_repository_url>
// git fetch origin
// git push new-origin --all

// git add .
// git commit -m "Your commit message"

// git push new-origin <branch_name>

