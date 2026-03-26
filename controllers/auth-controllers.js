const bcrypt = require("bcrypt");
const Signup = require("../models/signup");
const Login = require("../models/login");
const signup = (req, res) => {
  res.render("signup", { error: null });
};

const postSignup = async (req, res) => {
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.password2,
    uploadedImage: req.file.path,
  };
  const sign = new Signup(userData.username);
  const match = await sign.find();
  if (match) {
    return res.render("signup", {
      error: "username already exists",
    });
  }
  if (userData.password !== userData.password2) {
    return res.render("signup", { error: "Passwords do not match" });
  }
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const signup = new Signup(
      userData.username,
      userData.email,
      hashedPassword,
      userData.uploadedImage
    );
    await signup.save();
    return res.redirect("/login");
  } catch (error) {
    res.render("signup", { error: "Error Logging in" });
  }
};

const login = (req, res) => {
  res.render("login", { error: null });
};

const postLogin = async (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
  };
  const login = new Login(userData.username, userData.password);
  const match = await login.find();
  if (!match) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }
  try {
    const comparedPassword = await bcrypt.compare(
      userData.password,
      match.password
    );
    if (comparedPassword) {
      req.session.username = userData.username;
      return req.session.save(() => {
        res.redirect("/dashboard");
      });
    } else {
      return res.render("login", {
        error: "Invalid Username or Password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.render("login", { error: "Error Logging in" });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

module.exports = {
  signup,
  postSignup,
  login,
  postLogin,
  logout,
};
