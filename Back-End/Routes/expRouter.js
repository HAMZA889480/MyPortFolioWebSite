const express = require("express");

const expHandler = require("../Controllers/expHandler");
const authHandler = require("../Controllers/authHandler");
//creating router using express
const router = express.Router();

//Routers for normal users (current user)
router
  .route("/")
  .post(authHandler.verifyUserLogedIn, expHandler.addExprience)
  .get(authHandler.verifyUserLogedIn, expHandler.getMyExperience);

router
  .route("/:id")
  .patch(authHandler.verifyUserLogedIn, expHandler.updateMyExperience)
  .delete(authHandler.verifyUserLogedIn, expHandler.deleteMyExperience);
router
  .route("/admin")
  .get(
    authHandler.verifyUserLogedIn,
    authHandler.restrictTo("admin"),
    expHandler.getUserExperience
  );
module.exports = router;
