const express = require("express");

const Room = require("../schemas/room");
const Chat = require("../schemas/chat");
const User = require("../schemas/user");

const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const rooms = await Room.find({});
    res.send({ rooms }); // '{'rooms': []}
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get("/user", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send({ users });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.post("/user/signup", async (req, res, next) => {
  try {
    const isOverlapped = await User.findOne({ id: req.body.id });
    if (!isOverlapped) {
      const user = await User.create({
        profileImage: `https://ui-avatars.com/api/?name=${req.body.id}`,
        id: req.body.id,
        pw: req.body.pw,
        name: req.body.name,
        comment: req.body.comment,
      });
      res.send({ status: "success" });
    } else {
      res.send({ status: "fail" });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.post("/user/login", async (req, res, next) => {
  try {
    const isUser = await User.findOne({ id: req.body.id, pw: req.body.pw });
    if (isUser) {
      const token = jwt.sign(
        { id: isUser.id, pw: isUser.pw, name: isUser.name },
        "secretkeyofNodeChat",
        { expiresIn: "9999 years" }
      );
      res.send({ status: "success", profile: isUser, token: token });
    } else {
      res.send({ status: "fail" });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.post("/user/auth", async (req, res, next) => {
  try {
    const auth = req.headers.authorization || false;
    if (!auth) {
      res.send({ status: "fail" });
    } else {
      const decoded = jwt.verify(
        req.headers.authorization,
        "secretkeyofNodeChat"
      );
      const userData = await User.findOne({ id: decoded.id });
      res.send({ status: "success", userData: userData });
    }
  } catch (e) {
    console.log(e);
    res.send({ status: "fail", message: e.message });
    next(e);
  }
});

router.post("/user/update", async (req, res, next) => {
  try {
    const userUpdate = await User.findOneAndUpdate(
      { id: req.body.id },
      {
        name: req.body.name,
        comment: req.body.comment,
        profileImage: req.body.profileImage,
      },
      { new: true }
    );
    if (userUpdate) {
      res.send({ status: "success" });
    } else {
      res.send({ status: "fail" });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.post("/room", async (req, res, next) => {
  try {
    const room = await Room.findOne({ title: req.body.title });
    //title이 중복되는지 확인. 중복되면 return {{status: 'fail'}}

    if (!room) {
      const newRoom = await Room.create({
        title: req.body.title,
        owner: req.body.owner,
      });
      res.send({ status: "success" });
    } else {
      res.send({ status: "fail" }); //중복되는 방이 있습니다.
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.delete("/room/:title", async (req, res, next) => {
  try {
    await Room.remove({ title: req.params.title });
    await Chat.remove({ title: req.params.title });

    res.send({ status: "success" });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//특정 타이틀을 가진 채팅방 안에서 채팅을 쳤을 경우. 해당 소켓에 emit
router.post("/room/:title/chat", async (req, res, next) => {
  try {
    const chat = await Chat.create({
      title: req.body.title,
      user: req.body.user,
      chat: req.body.chat,
    });
    req.app.get("io").of("/chat").to(req.params.title).emit("chat", chat); //chat 소켓에다가 채팅이라고 보내는 것
    res.send({ status: "success" });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
