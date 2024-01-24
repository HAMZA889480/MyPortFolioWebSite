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
