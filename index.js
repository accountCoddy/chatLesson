const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = 3000
let users = []

app.use(express.static('static'))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})


io.on('connection', socket=>{
    socket.on('chatMessage', msg =>{
        io.emit('chatMessage', msg)
    })

    socket.on('addUser', msg =>{
        socket.user = msg
        users.push(msg)
        updateUsers()
    })

    socket.on('connect', ()=>{
        updateUsers()
    })

    socket.on('getUser', ()=>{
        io.emit('getUser', users)
    })
})

function updateUsers(){
    io.emit('update', users)
}



http.listen(port, ()=>{
    console.log('Server Start...');
})