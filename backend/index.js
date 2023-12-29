const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const app = express()
const port = process.env.PORT || 8080
const mongoDB = require('./database')

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","https://rasoi.onrender.com")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next()
})

app.use(express.json())
app.use('/api', require('./routes/CreateUser'))
app.use('/api', require('./routes/DisplayItems'))
app.use('/api', require('./routes/OrderData'))
app.get('/', (req, res) => {
  res.send('hello world')
})
app.listen(port, () => {
    console.log(`Rasoi app is listening of port ${port}`)
})