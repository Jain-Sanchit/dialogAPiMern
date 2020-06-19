const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const passport=require('passport')
const users=require('./routes/users')
const index = require("./routes/index");
const app=express()

app.use(bodyParser.urlencoded({
    extended:false
})
)

app.use(bodyParser.json())

const db=require('./configs/keys').mongoURI

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDb Connected!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(passport.initialize())

require('./configs/passport')(passport)

app.use('/users',users)
app.use('/',index)

const port=process.env.port || 5000;

app.listen(port,() =>{
    console.log(`Running on ${port}`);
    
})