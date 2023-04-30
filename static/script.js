const socket = io()
const form = document.querySelector('#message_form')
const input_message = document.querySelector('#message')
const all_messages = document.querySelector('#all_messages')
const input_name = document.querySelector('#name')
let users = []
const userHolder = document.querySelector('.users')


form.addEventListener('submit', e =>{
    e.preventDefault()
    if(!input_message.value || !input_name.value) return
    socket.emit('chatMessage', {
        name: input_name.value,
        message: input_message.value,
    })

    socket.emit('addUser', input_name.value)

    input_message.value = ''
})

socket.on('chatMessage', msg =>{
    let newMessage = document.createElement('p')
    newMessage.textContent = `${msg.name}: ${msg.message}`
    all_messages.append(newMessage)
})


socket.on('update', msg =>{
    updateListUser(msg)
})

socket.on('disconnect', (msg)=>{
    console.log(msg)
})

socket.on('connect', msg =>{
    socket.emit('getUser')
})

socket.on('getUser', users =>{
    updateListUser(users)
})


function updateListUser(listUsers){
    users = listUsers
    console.log(users)
    userHolder.innerHTML = ''
    users.forEach(user =>{
        let newUser = document.createElement('li')
        newUser.textContent = user
        userHolder.append(newUser)
    })
}