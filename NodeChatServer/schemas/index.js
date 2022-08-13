const mongoose = require('mongoose');

const mongoUrl = `mongodb://localhost:27017/admin`

const connect = () => {
    mongoose.connect(mongoUrl,{
        dbName: "NodeChat",
        useNewUrlParser: true,  //not required just to stop warning console
    }, (error) => {
        if(error) {
            console.log("몽고디비 연결 실패", error)
        } else {
            console.log("몽고디비 연결 성공");
        }
    }); 
}

mongoose.connection.on('error', (error) => {
    console.log("몽고디비 연결 에러", error);
})

mongoose.connection.on("disconnected", () => {
    console.log('몽고디비 연결 끊김. 연결 재시도')
    connect()
})

module.exports = connect; 