const express = require("express");

const expHandler = require("../Controllers/expHandler");
const authHandler = require("../Controllers/authHandler");
//creating router using express
const router = express.Router();

router.route("/").post(authHandler.verifyUserLogedIn, expHandler.addExprience);

module.exports = router;
