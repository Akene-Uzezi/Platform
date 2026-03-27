const mongodbStore = require("connect-mongodb-session");
const session = require("express-session");
const uuid = require("uuid");
require("dotenv").config();
const createSessionStore = () => {
  const MongodbStore = mongodbStore(session);
  const store = new MongodbStore({
    uri: process.env.MONGODB_URI,
    databaseName: "platform",
    collection: "session",
  });
  return store;
};

const createSessionConfig = () => {
  return {
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 30 * 60 * 1000,
    },
  };
};

module.exports = createSessionConfig;
