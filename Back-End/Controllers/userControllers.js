const fs = require("fs");

const Users = require("../Models/userModel");
const appError = require("../error");
const multer = require("multer");
const sharp = require("sharp");
const dotenv = require("dotenv");

const jwt = require("jsonwebtoken");

//settign up the path to config file
dotenv.config({ path: "./config.env" });

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

//configure the multer for user images
//1)- Specify the storage
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images/user");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];

//     cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();
//adding file type filter
//2)- Only images are uploaded
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] == "image") {
    cb(null, true);
  } else {
    //not  an image
    cb(new appError("File type is not an image. Select an image", 400));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//middle-ware for image uploading
exports.uploadImage = upload.single("photo");

//middle-ware to reszie the image
exports.imageResize = async (req, res, next) => {
  if (req.file) {
    const directory = "public/images/users";

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    //setting up the file name
    req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;
    //applying the resize using the sharp package
    await sharp(req.file.buffer)
      .resize(
        parseInt(process.env.USER_IMAGE_WIDTH),
        parseInt(process.env.USER_IMAGE_HEIGHT)
      ) //resizing
      .toFormat("jpeg") //convert it to jpeg format
      .jpeg({ quality: 80 }) //cpmressing the image quality
      .toFile(`${directory}/${req.file.filename}`); //saving file to specific path

    next();
  }
};
//creating  a user
exports.createUser = async (req, res, next) => {
  try {
    const user = await Users.create(req.body);

    //creating jwt token for the user
    const token = jwt.sign(
      {
        id: user._id,
        iat: Date.now(),
        exp: Date.now() + parseInt(process.env.TOKEN_DURATION),
      },
      process.env.SECREAT_KEY
    );

    res.cookie("jwt", token, {
      // Setting the expiry time of the cookie
      expires: new Date(Date.now() + parseInt(process.env.TOKEN_DURATION)),
      httpOnly: true,
    });

    res.status(201).json({
      status: 201,
      message: "Created",
      data: user,
    });
  } catch (err) {
    if (
      err.message.includes(
        "E11000 duplicate key error collection: portfolio.users index: email_1 dup key:"
      )
    ) {
      return next(new appError("Email already exist", 400));
    } else if (
      err.message.includes(
        "E11000 duplicate key error collection: portfolio.users index: phone_1 dup key:"
      )
    ) {
      return next(new appError("Phone already exist", 400));
    }

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
  //check if data is passed for update. Either body or file
  if (Object.keys(req.body) === 0 && !req.file) {
    return next(new appError("Body is empty!!", 400));
  }

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

  //checking if image is uploaded.
  //In this case, file is present in the body
  if (req.file) {
    //adding a field named as image field in the filteredUpdate object
    //and assigning the fileName

    fileredUpdates.image = req.file.filename;
  }

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
  let findMe;
  try {
    findMe = await Users.findById(req.user._id)
      .populate({
        path: "experience",
        select: "-__v",
      })
      .populate({
        path: "projects",
        select: "-__v",
      });
  } catch (err) {
    return next(new appError("Could Not search for user", 500));
  }

  if (!findMe) {
    return next(new appError("Could Find your data", 404));
  }

  res.status(200).json({ message: "Found", myData: findMe });
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
exports.deleteUser = async (req, res, next) => {
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
