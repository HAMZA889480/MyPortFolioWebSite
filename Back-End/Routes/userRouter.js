const express = require("express");

const userHandlers = require("../Controllers/userControllers");
const authHandler = require("../Controllers/authHandler");
const router = express.Router();

//creating a router for auth permission
router

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
  .patch(
    "/updateStatus",
    authHandler.verifyUserLogedIn,
    authHandler.restrictTo("admin"),
    authHandler.activateUser
  );

//user Routes (allowed to admin user)
router
  .route("/")
  .get(
    authHandler.verifyUserLogedIn,
    authHandler.restrictTo("admin"),
    userHandlers.getAllUsers
  ) //get all users (by admin)
  .post(
    authHandler.verifyUserLogedIn,
    authHandler.restrictTo("admin"),
    userHandlers.searchUser
  ) //find a user (by admin)
  .delete(
    authHandler.verifyUserLogedIn,
    authHandler.restrictTo("admin"),
    userHandlers.deleteUser
  );

//user Routers (allowed to normal user)
router
  .patch(
    "/updateMe",
    authHandler.verifyUserLogedIn,
    userHandlers.uploadImage,
    userHandlers.updateMe
  )
  .delete("/deleteMe", authHandler.verifyUserLogedIn, userHandlers.deleteMe)
  .get("/getMe", authHandler.verifyUserLogedIn, userHandlers.getMe);

module.exports = router;
