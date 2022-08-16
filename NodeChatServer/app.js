const express = require("express");
const morgan = require("morgan");
const connect = require("./schemas");
const indexRouter = require("./routes");
const webSocket = require("./socket");
const jwt = require("jsonwebtoken");

const app = express();
app.set("port", process.env.PORT || 3000);
connect();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);

app.use((req, res, next) => {
  const error = new Error("no router");
  error.status = 400; //없는 라우터로 접근했을때 404
  next(error);
});

//에러처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.status(err.status || 500);
});
const server = app.listen(app.get("port"), () => {
  `${app.get("port")}번 포트에서 연결되었습니다`;
});

webSocket(server, app);
