const express = require("express");

const authHandler = require("../Controllers/authHandler");
const eduHandler = require("../Controllers/eduHandler");
//CReater router as a middle-ware
const Router = express.Router();

Router.route("/")
  .post(authHandler.verifyUserLogedIn, eduHandler.addEducation)
  .get(authHandler.verifyUserLogedIn, eduHandler.getAllEducation)

  .delete(
    authHandler.verifyUserLogedIn,
    authHandler.restrictTo("admin"),
    eduHandler.removeEducation
  );

Router.route("/:title").get(
  authHandler.verifyUserLogedIn,
  eduHandler.findEducation
);

Router.route("/:email/:title").patch(
  authHandler.verifyUserLogedIn,
  authHandler.restrictTo("admin"),
  eduHandler.updateEducation
);
module.exports = Router;
