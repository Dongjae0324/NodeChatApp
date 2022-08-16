const Socket = require("socket.io");
const axios = require("axios");

module.exports = (server, app) => {
  const io = Socket(server, { path: "/socket.io" }); //default 설정임
  app.set("io", io); //req.app.get('io)가 라우터에서 가능해짐.

  const chat = io.of("/chat");

  chat.on("connect", (socket) => {
    console.log("chat 네임스페이스에 접속");
    const roomTitle = socket.handshake.auth.title;
    const userName = socket.handshake.auth.user;

    socket.join(roomTitle); //해당 소켓이 방에 들어옴.
    console.log(`${roomTitle} room 접속`);
    chat.to(roomTitle).emit("join", {
      user: userName,
      chat: `${userName}님이 입장하셨습니다.`,
    });

    socket.on("disconnect", () => {
      console.log("chat 네임스페이스에서 접속 해제");
      socket.leave(roomTitle); //해당 socket이 방을 나감.
      const currentRoom = socket.adapter.rooms; //room에 접속해있는 소켓의 수
      const userCount = currentRoom.size;

      if (userCount == 0) {
        axios
          .delete(`http://localhost:3000/room/${roomTitle}`)
          .then(() => {
            console.log("방 제거 요청이 완료되었습니다.");
          }) //방에 남아있는 인원이 없으면 삭제
          .catch((e) => {
            console.log(e);
          });
      } else {
        chat.to(roomTitle).emit("exit", {
          user: userName,
          chat: `${userName}님이 퇴장하셨습니다.`,
        });
      }
    });
  });
};
