const mongoose = require("mongoose");
const Logger = require("./logger");
const constants = require("./constants");
const socket = require("./utils/socket");

const database = {};
// mongoose.Promise = global.Promise;
database.isConnectedToDb = false;

database.isConnected = function isConnected() {
  return database.isConnectedToDb;
};

mongoose.connection.on("error", (err) => {
  Logger.error(`Got error event ${err}`);
});

mongoose.connection.on("disconnected", () => {
  Logger.error("Got disconnected event from database");
  database.isConnectedToDb = false;
});

mongoose.connection.on("reconnected", () => {
  Logger.log("Got reconnected event from database");
  database.isConnectedToDb = true;
});

database.connect = function connect() {
  mongoose.set("debug", process.env.NODE_ENV !== "production");
  mongoose
    .connect(constants.database.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      connectTimeoutMS: 3000,
      // useFindAndModify: false,
      // promiseLibrary: global.Promise,
    })
    .then(() => {
      Logger.log("Successfully connected to system database");
      database.isConnectedToDb = true;
    })
    .catch((err) => {
      Logger.error(
        `An error occurred while trying to connect to the system database, retrying in ${constants.database.connectRetry}s. Err: ${err}`
      );
      setTimeout(database.connect, constants.database.connectRetry * 1000);
    });
};

database.disconnect = function disconnect() {
  if (database.isConnected()) {
    mongoose
      .disconnect()
      .then(() => {
        database.isConnectedToDb = false;
      })
      .catch((err) => {
        Logger.error(
          `An error occurred while trying to disconnect from the system database. Err: ${err}`
        );
      });
  }
};

module.exports = database;
