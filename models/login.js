const db = require("../data/platform.db");
class Login {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  async find() {
    return await db
      .getDb()
      .collection("users")
      .findOne({ username: this.username });
  }
}

module.exports = Login;
