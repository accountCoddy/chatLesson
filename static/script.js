const socket = io()
const form = document.querySelector('#message_form')
const input_message = document.querySelector('#message')
const all_messages = document.querySelector('#all_messages')
const input_name = document.querySelector('#name')


form.addEventListener('submit', e =>{
    e.preventDefault()
    if(!input_message.value || !input_name.value) return
    socket.emit('chatMessage', {
        name: input_name.value,
        message: input_message.value,
    })
    input_message.value = ''
})

socket.on('chatMessage', msg =>{
    let newMessage = document.createElement('p')
    newMessage.textContent = `${msg.name}: ${msg.message}`
    all_messages.append(newMessage)
})