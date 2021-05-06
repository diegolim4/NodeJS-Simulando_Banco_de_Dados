const express = require('express')
const bodyParser = require('body-parser')
const userRoute = require('./routers/userRoute')

app = express()
app.use(bodyParser.urlencoded({extended: false}))
userRoute(app)  

app.get('/', (req, res) => {
    res.send('Hello World')
})


const PORT = 3001
app.listen(PORT, ()=>{
    console.log('Api rodando http://localhost:3001')
})

