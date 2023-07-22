const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const PORT = 8080;
// http://localhost:8080/#/{pageName} find page in react-app/src/index.js
const PATH_STATIC_RESOURCE_REACT = __dirname + "/views/";

const Logger = require("./middlewares/logger.middleware");
const Jwt = require("./middlewares/jwt.middleware");

const userRoute = require("./routes/user.route");
const accountRoute = require("./routes/account.route");
const notifyRoute = require("./routes/notify.route");
const studentRoute = require("./routes/student.route");
const classRoute = require("./routes/class.route");
const scoreRoute = require("./routes/score.route");

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static(PATH_STATIC_RESOURCE_REACT));
app.use(cors(corsOptions));

app.use(Logger.loggerRequestMiddleware);
// app.use(Jwt.verifyToken, Jwt.verifyRequestMiddleware);

app.use("/users", userRoute);
app.use("/api/accounts", accountRoute);
app.use("/api/notifies", notifyRoute);
app.use("/api/students", studentRoute);
app.use("/api/classes", classRoute);
app.use("/api/scores", scoreRoute);

app.use(Logger.loggerErrorMiddleware);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
