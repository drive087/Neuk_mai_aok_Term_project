const express = require("express");
const mongoUtil = require("./mongoUtil");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const LocalStrategy = require("passport-local").Strategy;
const dotenv = require('dotenv');

console.log("Start server");

const passport = require("./passport").pp();
const userRouter = require("./routes/testuserRoutes");
const jobRouter = require("./routes/jobs");
const app = express();

// DB Config

dotenv.config({
  path: './config.env'
});

const uri = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

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
app.use(passport.session());

//   app.use('/', doctorRouter)
app.use("/user", userRouter);
app.use("/jobs", jobRouter);
app.use("/", (req, res, next) => {
  res.send("Hello WOrld");
});
app.listen(8000, () => console.log("server started"));


// mongoUtil.connectToServer(function (err, client) {
//   if (err) console.log(err);
//   const passport = require("./passport").pp();
//   const userRouter = require("./routes/userRoutes");
//   const jobRouter = require("./routes/jobs");
//   const app = express();

//   app.use(
//     cors({
//       origin: ["http://localhost:3000"],
//       credentials: true,
//     })
//   );

//   app.use(express.json());
//   app.all("*", function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header(
//       "Access-Control-Allow-Methods",
//       "PUT, GET, POST, DELETE, OPTIONS"
//     );
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });
//   app.use(
//     session({
//       secret: "qve~UV20_0",
//       resave: false,
//       saveUninitialized: false,
//     })
//   );

//   // passport middleware setup ( it is mandatory to put it after session middleware setup)
//   app.use(passport.initialize());
//   app.use(passport.session());

//   //   app.use('/', doctorRouter)
//   app.use("/user", userRouter);
//   app.use("/jobs", jobRouter);
//   app.use("/", (req, res, next) => {
//     res.send("Hello WOrld");
//   });
//   app.listen(8000, () => console.log("server started"));
// });
