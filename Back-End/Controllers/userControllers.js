const Users = require("../Models/userModel");
const appError = require("../error");

//method for filering the body.
//This method is called by updateMe Hnadler
//This Handler takes srings of fileds that are allowed to update
//and convert them to a array using spread operator

function filterBody(body, ...filerArray) {
  const newFileredArray = {};
  Object.keys(body).forEach(function (el) {
    if (filerArray.includes(el)) {
      // array contains the key
      //store the key and its value in new Array

      newFileredArray[el] = body[el];
    }
  });

  return newFileredArray;
}

//creating  a user
exports.createUser = async (req, res, next) => {
  try {
    const user = await Users.create(req.body);
    res.status(201).json({
      message: "Created",
      data: user,
    });
  } catch (err) {
    console.log(err.message);
    return next(new appError(err.message, 500));
  }
};

//getting all the users
exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await Users.find({});

    res
      .status(200)
      .json({ message: "Success", count: allUsers.length, data: allUsers });
  } catch (err) {
    console.log(err.message);
    return next(new appError(err.message, 500));
  }
};

//update Current User
exports.updateMe = async (req, res, next) => {
  //user is logned in.
  //So, we have user saved in req.user(done in the verifyLOgedInUser Handler)

  //User try to update password
  if (req.body.password) {
    return next(
      new appError(
        "You cannot update Password on this Route. Use /updatePassword",
        400
      )
    );
  }

  //Filter out the fileds that are allowed to update by a user from body

  let fileredUpdates = filterBody(req.body, "name", "email", "phone");

  //use findByIdAndUpdate, and not update and save because in the latter approach
  //the save method of mongoose will run and check for passwords. But we do not
  //updated the password. So, dont use this approach here
  let updatedUser;
  try {
    updatedUser = await Users.findByIdAndUpdate(req.user._id, fileredUpdates, {
      new: true, //returns the updated Document
      runValidators: true, //run all the validators
    });
  } catch (err) {
    console.log(err.message);
    return next(new appError(err.message, 400));
  }

  res.status(200).json({ message: "Modified", updatedUser });
};

//delete Current user (set current user to inactive state)
exports.deleteMe = async (req, res, next) => {
  //1)- Check that the password is given(for the cofirmation)
  if (!req.body.password) {
    return next(new appError("Provide your password for confirmation", 401));
  }

  //2)- Match the password with currently Loged User
  if (!(await req.user.matchPassword(req.body.password, req.user.password))) {
    return next(
      new appError(
        "Wrong Password. Provide your password for confirmation",
        401
      )
    );
  }

  //3)- delete the user(inactive the user)
  req.user.active = false;
  req.user.save({ validateBeforeSave: false }); //save without validation
  res.status(204).json({ message: "Success", details: null });
};

//get data of currently logedIn user
exports.getMe = async (req, res, next) => {
  // 1)- User is logined
  //logined Users are save in req.user
  let findUser;
  try {
    findUser = await Users.findById(req.user._id).populate("experience");
  } catch (err) {
    return next(new appError("Could Not search for user", 500));
  }

  if (!findUser) {
    res.status(404).json({ message: "Fail", data: findUser });
  }

  res.status(200).json({ message: "Found", userData: findUser });
};

//search a  logined user using email(by admin)
exports.searchUser = async (req, res, next) => {
  //1) Check if enail is present
  if (!req.body.email) {
    return next(new appError("Provide the email of the user to Search"));
  }
  //2) Check the email in DB
  let user;

  try {
    user = await Users.findOne({ email: req.body.email });
  } catch (err) {
    return next(new appError(err.message, 500));
  }

  if (!user) {
    return next(new appError("Email does not exist", 404));
  }
  //3) return the user
  res.status(200).json({ message: "Found", user });
};

//delete a user using email ID (by admin)
exports.deleteUser = async (req, res) => {
  //1) Check if email is present
  if (!req.body.email) {
    return next(new appError("Provide the email of the user to Search"));
  }

  //2) Check if user exist in DB. If yes, then delete it
  try {
    await Users.findOneAndDelete({ email: req.body.email });
  } catch (err) {
    return next(new appError("User not deleted", 500));
  }

  res.status(204).json({ message: "Deletd", data: null });
};
