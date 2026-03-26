const db = require("../data/platform.db");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
class Platform {
  constructor(username) {
    this.username = username;
  }

  async getUserLog() {
    return await db
      .getDb()
      .collection("users")
      .findOne({ username: this.username });
  }

  static async getUsers() {
    return await db.getDb().collection("users").find().toArray();
  }

  static async getUserFetch(id) {
    const userId = new ObjectId(id);
    const user = await db.getDb().collection("users").findOne({ _id: userId });
    return user;
  }
}

module.exports = Platform;
