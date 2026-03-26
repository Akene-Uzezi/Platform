const express = require("express");
const session = require("express-session");
const createSessionConfig = require("./config/session.config");
const app = express();
const authRoutes = require("./routes/auth");
const platformRoutes = require("./routes/platformroutes");
const path = require("path");
const database = require("./data/platform.db");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const sessionConfig = createSessionConfig();
app.use(session(sessionConfig));
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use(express.urlencoded({ extended: false }));
app.use(platformRoutes);
app.use(authRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});

app.use((error, req, res, next) => {
  res.status(500).render("500");
  console.log(error);
});

const PORT = process.env.PORT || 3000;

database.connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to the database and started the server: ", PORT);
  });
});
