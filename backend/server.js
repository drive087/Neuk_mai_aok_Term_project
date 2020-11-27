const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const LocalStrategy = require("passport-local").Strategy;
const dotenv = require('dotenv');
const passport = require("passport");
const jwt_decode = require("jwt-decode");
const logger = require("./log/logger")

// const passport = require("./passport").pp();
const userRouter = require("./routes/userRoutes");
const jobRouter = require("./routes/jobsRoutes");
const app = express();

// DB Config

dotenv.config({
  path: './config.env'
});

const uri = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Connect to MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => logger.info("MongoDB successfully connected"))
  .catch((err) => logger.error(err));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(
  session({
    secret: "qve~UV20_0",
    resave: false,
    saveUninitialized: false,
  })
);

// passport middleware setup ( it is mandatory to put it after session middleware setup)
app.use(passport.initialize());
require("./config/passport")(passport);
// app.use(passport.session());

app.use(async (req) => {
  try {
    const userInfo = jwt_decode(req.headers.authorization);
    req.userInfo = userInfo;
    return req.next();
  } catch (e) {
    return req.next();
  }
});

app.use("/user", userRouter);
app.use("/jobs", passport.authenticate("jwt", { session: false }), jobRouter);
app.use("/", (req, res, next) => {
  res.send("Hello World");
});
app.listen(8000, () => logger.info("Server Started: 8000"));
