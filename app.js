const express = require('express')
app = express()


app.get('/', (req, res) => {
    res.send('Hello World')
})


const PORT = 3001
app.listen(PORT, ()=>{
    console.log('Api rodando http://localhost:3001')
})

