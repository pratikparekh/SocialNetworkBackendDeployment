const express = require ('express');
const app = express();
const postRoutes= require("./routes/post");
const authRoutes= require("./routes/auth");
const userRoutes= require("./routes/user");
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
var cookieParser = require('cookie-parser');
const fs = require('fs');
const cors = require('cors');
const expressValidator =require('express-validator');
// load env variables

const dotenv = require('dotenv');
dotenv.config()
 
//db connection
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true}
)
.then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});


const myOwnMiddleware  =  (res,req,next)=>{
	console.log("middeleware");
	next();
};
///middeleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
//app.use(myOwnMiddleware);

app.use("/",postRoutes);
app.use("/",authRoutes);
app.use("/",userRoutes);

//api docs

app.get("/",(req,res)=>{

	fs.readFile('docs/apiDocs.json',(err,data)=>{
		if(err){
			return res.status(400).json({
				error:err
			});
		}

		const docs = JSON.parse(data);
		res.json(docs);
	});
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error:"Unauthorized"});
  }
});

const port = process.env.PORT || 8080;
app.listen(port,()=>{
	console.log('Port: ${port} is listening' );

});
