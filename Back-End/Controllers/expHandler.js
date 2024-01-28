const mongoose = require("mongoose");
const Experience = require("../Models/expModel");
const appError = require("../error");
const Users = require("../Models/userModel");
//adding the Exprience

exports.addExprience = async (req, res, next) => {
  let addedExp;
  try {
    //appending user ID with the req.body
    req.body.user = req.user._id;
    addedExp = await Experience.create(req.body);
  } catch (err) {
    console.log(err.message);

    //checking for duplicate error
    if (err.message.includes("duplicate key error collection")) {
      return next(new appError("Exp already exists", 400));
    } else {
      return next(new appError("Experience Not added!", 500));
    }
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
    currUserExp = await Users.findOne(req.user._id)
      .select("name email cnic -_id")
      .populate({
        path: "experience",
        select: " -__v",
      });
  } catch (err) {
    return next(new appError("Could not search for experience!!", 500));
  }

  if (!currUserExp) {
    return next(new appError("User or experience not found", 404));
  }

  res.status(200).json({
    message: "Found",
    count: currUserExp.experience.length,
    currUserExp,
  });
};

//upading experience on basis of experience ID (normal user)
exports.updateMyExperience = async (req, res, next) => {
  //2)- Check if body is given

  if (Object.keys(req.body).length === 0) {
    //get all keys in the req.body object(if any)
    return next(new appError("Body is empty", 400));
  }
  //3)- update the experience using the id passed in parameter
  let updateExp;
  try {
    updateExp = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
  } catch {
    return next(new appError("Error in updating the experience", 400));
  }

  res.status(200).json({ message: "Updated", updateExp });
};

exports.deleteMyExperience = async (req, res, next) => {
  //1) delete experience
  let deletedExp;
  try {
    deletedExp = await Experience.findByIdAndDelete(req.params.id);
  } catch (err) {
    console.log(err.message);
    return next(new appError("Error in deleting the experience!!", 500));
  }

  if (!deletedExp) {
    return next(new appError("Experience NOT found"));
  }
  //2) Remove experience ID from experience array in the User document
  //I)- Find the respected user document
  let userDoc;
  try {
    userDoc = await Users.findById(req.user._id);
  } catch (err) {
    console.log(err.message);
    return next(new appError("User NOT found!!"));
  }

  //II)- Find the exp ID in user doc and delted it
  userDoc.experience.forEach(async (eachExp, index = 0) => {
    if (eachExp == req.params.id) {
      console.log("Found");

      //removing the experience from userDoc
      userDoc.experience.splice(index, 1);

      //saving the modified experience array
      try {
        await userDoc.save();
      } catch (err) {
        console.log(err.message);
        return next(new appError("Experience NOT removed from user doc"));
      }
    }

    index++;
  });
  res.status(204).json({ message: "deleted", data: null });
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
