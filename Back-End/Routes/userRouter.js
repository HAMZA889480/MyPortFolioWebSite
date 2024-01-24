const express = require("express");

const userHandlers = require("../Controllers/userControllers");
const authHandler = require("../Controllers/authHandler");
const router = express.Router();

//creating a router for auth permission
router
  .get(
    "/",
    authHandler.verifyUserLogedIn,
    authHandler.restrictTo("admin"),
    userHandlers.getAllUsers
  )
  .post(
    "/signup",
    authHandler.verifyUserLogedIn,
    authHandler.restrictTo("admin"),
    userHandlers.createUser
  )

  .post("/login", authHandler.login)
  .post("/forgetPassword", authHandler.forgetPassword)
  .patch("/resetPassword", authHandler.resetPassword)
  .patch(
    "/updatePassword",
    authHandler.verifyUserLogedIn,
    authHandler.updatePassword
  )
  .patch("/updateMe", authHandler.verifyUserLogedIn, userHandlers.updateMe)
  .delete("/deleteMe", authHandler.verifyUserLogedIn, userHandlers.deleteMe);

router
  .route("/")
  .get(authHandler.verifyUserLogedIn, userHandlers.getAllUsers)
  .post(authHandler.verifyUserLogedIn, userHandlers.searchUser);

// router
//   .route("/:id")
//   .get(userHandlers.findUser)

//   .delete(userHandlers.deleteUser);

module.exports = router;
