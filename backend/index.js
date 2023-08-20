const express = require('express')
const app = express()
const port = 8080
const mongoDB = require('./database')

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
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