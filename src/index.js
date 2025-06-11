const Farmer = require('./schema/farmerSchema');
const Factory = require('./schema/factorySchema');
const Transparency = require('./schema/transparencyDistributorToFactory');
const Distributor = require('./schema/distributorSchema.js')

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

const transparency_route = require('./routes/transparency.js')
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


app.post('/transparency', async (req, res) => {
  const { farmerId, factoryId } = req.body;
  console.log(farmerId);
  
   
  //      // Replace with your DB logic
       const farmer = await Farmer.findById(farmerId);
       const factory = await Factory.findById(factoryId);
       const tx = await Transparency.findOne({ factoryId })
       
       console.log("dist")
       console.log(tx.distributorId);
       const id = tx.distributorId;
      // const distributor = await Distributor.findOne({ factoryId });
   
      //  if (!farmer || !factory || !distributor) {
      //    return res.status(404).json({ message: 'One or more entities not found' });
      //  }
      const distributor = await Distributor.findById(id);

      console.log(distributor)
       res.json({
         farmer,
         factory,
         distributor,
         tx
       });
   
  //    } catch (err) {
  //      console.error(err);
  //      res.status(500).json({ message: 'Server error' });
  //    }
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

