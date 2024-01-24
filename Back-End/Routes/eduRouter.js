const express = require("express");

const authHandler = require("../Controllers/authHandler");
const eduHandler = require("../Controllers/eduHandler");
//CReater router as a middle-ware
const Router = express.Router();

Router.route("/")
  .post(authHandler.verifyUserLogedIn, eduHandler.addEducation)
  .get(authHandler.verifyUserLogedIn, eduHandler.getAllEducation)
  .patch(
    authHandler.verifyUserLogedIn,
    authHandler.restrictTo("admin"),
    eduHandler.updateEducation
  )
  .delete(
    authHandler.verifyUserLogedIn,
    authHandler.restrictTo("admin"),
    eduHandler.removeEducation
  );

Router.route("/:title").get(
  authHandler.verifyUserLogedIn,
  eduHandler.findEducation
);
module.exports = Router;
