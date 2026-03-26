const db = require("../data/platform.db");
class Signup {
  constructor(username, email, password, imagePath) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.imagePath = imagePath;
  }

  async save() {
    await db.getDb().collection("users").insertOne({
      username: this.username,
      email: this.email,
      password: this.password,
      imagePath: this.imagePath,
    });
  }

  async find() {
    return await db
      .getDb()
      .collection("users")
      .findOne({ username: this.username });
  }
}

module.exports = Signup;
