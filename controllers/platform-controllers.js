const Platform = require("../models/platform");
const index = (req, res) => {
  res.render("index");
};

const dashboard = async (req, res) => {
  if (!req.session.username) {
    return res.redirect("/login");
  }
  const platform = new Platform(req.session.username);
  const user = await platform.getUserLog();
  res.render("dashboard", { user });
};

const getUsers = async (req, res) => {
  if (!req.session.username) {
    return res.redirect("/login");
  }
  const users = await Platform.getUsers();
  res.render("users", { users });
};

const getUserDetail = async (req, res) => {
  const user = await Platform.getUserFetch(req.params.id);
  res.render("user-detail", { user });
};

module.exports = {
  index,
  dashboard,
  getUsers,
  getUserDetail,
};
