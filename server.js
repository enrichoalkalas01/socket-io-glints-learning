const Express = require('express')
const App = Express()
const PORT = process.env.PORT || 7800
const Socketio = require('socket.io')

App.use(Express.static(__dirname + '/public'))

const ExpressServer = App.listen(PORT, () => { console.log(`Server is running in port : ${ PORT }`) })
const io = Socketio(ExpressServer) // Socket.io is listening on express server ( listening traffic )

io.on("connection", (socket) => {
    socket.emit("welcome", "Welcome to the socket.io server!!")

    socket.on("messageFromClient", (message) => {
        io.emit("messageFromServer", { text: message.text })
    })
})