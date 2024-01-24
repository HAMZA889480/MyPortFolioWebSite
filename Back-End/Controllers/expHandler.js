const Experience = require("../Models/expModel");
const appError = require("../error");
const Users = require("../Models/userModel");
//adding the Exprience
exports.addExprience = async (req, res, next) => {
  let addedExp;
  try {
    addedExp = await Experience.create(req.body);
  } catch (err) {
    console.log(err.message);
    return next(new appError("Experience Not added!", 500));
  }

  //adding the experience id to user
  req.user.experience = addedExp._id;
  try {
    await req.user.save();
  } catch (err) {
    console.log(err.message);
    return next(new appError("Experience not assign to user!", 500));
  }
  res.status(201).json({ message: "Success", addedExp });
};

//get experience of current user(logedIN user)
exports.getExperience = async (req, res, next) => {
  //loged IN user is saved in req.user

  //finding the current user and polpulating the experience field
  let userExp;

  try {
    userExp = await Users.findById(req.user)
      .select("name email cnic -_id")
      .populate({
        path: "experience",
        select: "-_id -__v",
      });
  } catch (err) {
    return next(new appError("Could not search for experience!!", 500));
  }

  if (!userExp) {
    return next(new appError("User or experience not found", 404));
  }

  res.status(200).json({ message: "Found", userExp });
};

//update experience of curren user(logedIn user)
exports.updateExperience = async (req, res, next) => {
  //check if body is empty or not
  if (!req.body) {
    return next(new appError("Provide details that you want to updated!", 400));
  }

  //find user
};
