const express = require('express')  // dependancies call
const cors = require('cors')
const bodyParser = require('body-parser')
const ServerConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig')

const farmerRouter = require('./routes/farmerRoute')
const factoryRouter = require('./routes/factoryRoute')
const distributorRouter = require('./routes/distributorRoute')
const paymentRouter = require('./routes/paymentRoute')
const distributorPayment =  require('./routes/Distributor_payment.js')
const predictRoute = require("./routes/predictRoute.js");
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/authRoute')
const app = express() // Got express server object

// If request is in JSON, text, urlencoded it correctly reads by Express Server
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors({
  origin: ServerConfig.ORIGIN_LINK,
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
}));


app.post('/ping', (req, res) => {
  console.log('Auth Token:', req.cookies);
  return res.json({message:"pong"})
});

// app.post('/factory/addLot', (req, res) => {
//   // Your logic to add a lot here
//   res.json({ success: true, message: "Lot added" });
// });

app.use('/farmers', farmerRouter);
app.use('/factory', factoryRouter);
app.use('/distributor', distributorRouter);
app.use('/payment', paymentRouter);
app.use('/distributor_payment', distributorPayment);
app.use('/auth', authRouter);
app.use("/api", predictRoute);


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

