const express = require("express");
const router = express.Router();
const platformControllers = require("../controllers/platform-controllers");

router.get("/", platformControllers.index);

router.get("/dashboard", platformControllers.dashboard);

router.get("/users", platformControllers.getUsers);

router.get("/users/:id/detail", platformControllers.getUserDetail);

module.exports = router;
