const express = require('express')

const Room = require('../schemas/room'); 
const Chat = require('../schemas/chat'); 

const router = express.Router();

router.post('/room', async(req, res, next) => {
    try{
        const newRoom = await Room.create({
            title: req.body.title,
            owner: req.body.owner
        })
        const io = req.app.get('io')
        io.of('/room').emit('newRoom', newRoom)
        res.send({status: "success"}) //방 만드는데 성공했다고 알려줌.
        //일단 잠시 보류
    } 
    catch(e){
        console.log(e)
        next(e)
    }
})

router.get('/room/:title', async(req, res, next)=> {
    try{
        const room = await Room.findOne({ title: req.params.title})
        return res.send({room})
    } 
    catch(e) {
        console.log(e)
        next(e)
    }
})

router.delete('/room/:title', async(req, res, next)=>{
    try{
        await Room.remove({title: req.params.title})
        await Chat.remove({room: req.params.title})

        res.send({status: 'success'})
        setTimeout(()=>{
            req.app.get('io').of('/room').emit('removeRoom', req.params.id)
        })
    }
    catch(e){
        console.log(e)
        next(e)
    }
})

//특정 타이틀을 가진 채팅방 안에서 채팅을 쳤을 경우. 해당 소켓에 emit  
router.post('/room/:title/chat', async (req, res, next) => {
    try {
      const chat = await Chat.create({
        room: req.body.title,
        user: req.body.user, 
        chat: req.body.chat,
      });
      req.app.get('io').of('/chat').to(req.params.title).emit('chat', {chat, user}); //chat 소켓에다가 채팅이라고 보내는 것
      res.send({status: 'success'});
    } catch (e) {
      console.log(e);
      next(e);
    }
  });
  
  
  module.exports = router;