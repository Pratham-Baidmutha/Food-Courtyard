const express = require('express')
const app = express()
const port =5000
const mongoDB = require('./db')  //connecting server
mongoDB();

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type, Accept"
  );
  next();
})

app.use(express.json())
app.use('/api',require("./routes/createUser"))
app.use('/api',require("./routes/DisplayData"))
app.use('/api',require("./routes/OrderData"))


app.listen(5000,()=>{
    console.log("server is running");
})