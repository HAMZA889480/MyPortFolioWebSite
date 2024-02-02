const express = require("express");

const authHandler = require("../Controllers/authHandler");
const eduHandler = require("../Controllers/eduHandler");
//CReater router as a middle-ware
const Router = express.Router();

Router.route("/")
  .post(authHandler.verifyUserLogedIn, eduHandler.addEducation)
  .get(authHandler.verifyUserLogedIn, eduHandler.getAllEducation);

Router.route("/:title").get(
  authHandler.verifyUserLogedIn,
  eduHandler.findEducation
);

Router.route("/:id")
  .patch(
    authHandler.verifyUserLogedIn,

    eduHandler.updateEducation
  )
  .delete(
    authHandler.verifyUserLogedIn,

    eduHandler.removeEducation
  );
module.exports = Router;
