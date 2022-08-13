const Socket = require('socket.io')
const axios = require('axios')

module.exports = (server, app) => {
    const io = Socket(server, {path: '/socket.io'}) //default 설정임
    app.set('io', io)
    const room = io.of('/room')
    const chat = io.of('/chat')

    room.on('connection', (socket) => {
        console.log('room 네임스페이스에 접속')
        socket.on('disconnect',()=>{
            console.log('room 네임스페이스에서 접속 해제')
        })  
    })

    chat.on('connection', (socket) => {
        console.log('chat 네임스페이스에 접속')
        console.log(socket.request)
        const req = socket.request;
        const {headers: {referer}} = req; 
        const roomId = referer //referer를 통해 client를 특정 name의 방으로 보냄. 
        socket.join(roomId); //해당 소켓이 방에 들어옴. 
        socket.to(roomId).emit('join', {
            user: req.user,
            chat: `${req.user}님이 입장하셨습니다.`
        })

        socket.on('disconnect',()=>{
            console.log('chat 네임스페이스에서 접속 해제')
            socket.leave(roomId) //해당 socket이 방을 나감.
            const currentRoom = socket.adapter.rooms[roomId]; //room에 접속해있는 소켓의 수
            const userCount = currentRoom ? currentRoom.length : 0; 
            if (userCount == 0 ) {
                axios.delete(`http://localhost:3000/room/${roomId}`)
                     .then(()=>{console.log('방 제거 요청이 완료되었습니다.')}) //방에 남아있는 인원이 없으면 삭제
                     .catch((e)=> {console.log(e)})  
            } else {
                socket.to(roomId).emit('exit', {
                    user: req.user,
                    chat: `${req.user}님이 퇴장하셨습니다.`
                })
            }
        })  
    })
    
}
