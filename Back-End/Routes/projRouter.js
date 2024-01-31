const express = require("express");
const projHandler = require("../Controllers/projHandler");
const authHandler = require("../Controllers/authHandler");
//getting the router from express
const router = express.Router();

//routers for normal users
router
  .route("/")
  .post(authHandler.verifyUserLogedIn, projHandler.addProject)
  .get(authHandler.verifyUserLogedIn, projHandler.getMyProjects);

router
  .route("/:id")
  .patch(
    authHandler.verifyUserLogedIn,
    projHandler.uploadProjImg,
    projHandler.resizeProjImg,
    projHandler.updateMyProject
  )
  .delete(authHandler.verifyUserLogedIn, projHandler.deleteMyProject);

router
  .route("/admin")
  .get(
    authHandler.verifyUserLogedIn,
    authHandler.restrictTo("admin"),
    projHandler.getUserProjects
  );
module.exports = router;
