const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
require("dotenv").config();
let database;

const connect = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  database = client.db("platform");
};

const getDb = () => {
  if (!database) {
    throw { message: "You must connect first" };
  }
  return database;
};

module.exports = {
  connectToDatabase: connect,
  getDb,
};
