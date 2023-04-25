const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = 3000


app.use(express.static('static'))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})


io.on('connection', socket=>{
    socket.on('chatMessage', msg =>{
        io.emit('chatMessage', msg)
    })
})




http.listen(port, ()=>{
    console.log('Server Start...');
})