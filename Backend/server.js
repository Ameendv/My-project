const express = require('express');
const app = express();
const dotenv = require("dotenv");
var cookieParser = require('cookie-parser')
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error-handler');
const mongoose = require("mongoose");


const getErrorCode = require('./helpers/getErrorCode')


var http = require('http');	
const fs = require('fs')	


dotenv.config();  
const mongoDBURI = process.env.mongoDBURI;





//mongodb connection
mongoose.connect(
  mongoDBURI,
      {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
   
  );

  const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

mongoose.set('debug', true);

  

app.use(bodyParser.urlencoded({ limit: "999mb", extended: true, parameterLimit: 10000000 }));
app.use(bodyParser.json({ limit: "999mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "999mb" }));
app.enable('trust proxy');
app.use(cookieParser());
// api routes
app.use(require('./controllers/user.controller'));


const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(errorHandler);


// global error handler
//app.use(errorHandler);




// start server
var httpServer = http.createServer(app);	
httpServer.listen(8080,()=>{
    console.log(`Server running on port 8080`)
});	
//app.listen(port, () => console.log('Server listening on port ' + port));	
