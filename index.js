const cookieParser = require("cookie-parser");
const httpStatus = require("http-status");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const AppError = require("./utils/AppError");
require("dotenv").config();
const db = require("./models");
const xtend = require("xtend");

const { getIO } = require("./utils/socket");
const app = express();

// enable cors
const corsOptions = {
  exposedHeaders: ["X-Access-Token"],
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors(corsOptions));

const { errorConverter, errorHandler } = require("./middlewares/error");
const { authLimiter } = require("./middlewares/rateLimiter");
const apiV1Router = require("./routes/v1");
const clientRouter = require("./routes/client/v1");
const igcRouter = require("./routes/v1/igc");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

if (app.get("env") === "production") {
  app.disable("x-powered-by");
  // limit repeated failed requests to auth endpoints
  app.use("/api/v1/auth/login", authLimiter);
}

app.use("/api/v1", apiV1Router);
app.use("/client/v1", clientRouter);
app.use("/", igcRouter);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new AppError("Not found", httpStatus.NOT_FOUND));
});

// convert error to AppError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

// process.on('uncaughtException', err => {
//   console.error(err && err.stack)
//   process.exit(0)
// });

app.locals.hehe = 66

module.exports = app;
