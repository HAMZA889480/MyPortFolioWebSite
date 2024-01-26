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
  req.user.experience.push(addedExp._id);
  try {
    await req.user.save();
  } catch (err) {
    console.log(err.message);
    return next(new appError("Experience not assign to user!", 500));
  }
  res.status(201).json({ message: "Success", addedExp });
};

//get experience of current user(logedIN user)
exports.getMyExperience = async (req, res, next) => {
  //loged IN user is saved in req.user

  //finding the current user and polpulating the experience field
  let currUserExp;

  try {
    currUserExp = await Users.findById(req.user)
      .select("name email cnic -_id")
      .populate({
        path: "experience",
        select: "-_id -__v",
      });
  } catch (err) {
    return next(new appError("Could not search for experience!!", 500));
  }

  if (!currUserExp) {
    return next(new appError("User or experience not found", 404));
  }

  res
    .status(200)
    .json({
      message: "Found",
      count: currUserExp.experience.length,
      currUserExp,
    });
};

//get the experience of specifci user by (admin)
exports.getUserExperience = async (req, res, next) => {
  if (!req.body.email) {
    return next(new appError("Provide the email of user", 400));
  }

  let userExp;
  try {
    userExp = await Users.findOne({ email: req.body.email })
      .select("name email cnic -_id")
      .populate({
        path: "experience",
        select: "-_id -__v",
      });
  } catch (err) {
    return next(new appError("Could NOT search for experience!", 500));
  }

  //if no user found
  if (!userExp) {
    return next(new appError("User NOT found. Invalide email", 500));
  }
  res
    .status(200)
    .json({ message: "Found", count: userExp.experience.length, userExp });
};
