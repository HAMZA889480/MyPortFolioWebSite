const sharp = require("sharp");
const appError = require("../error");
const Projects = require("../Models/projects");
const Users = require("../Models/userModel");
const multer = require("multer");
const fs = require("fs");

//configuration for multer
//1) settign up the storage
const imageStorage = multer.memoryStorage();

//2) filtering the file type for image only
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] == "image") {
    cb(null, true);
  } else {
    cb(new appError("You select wrong file. Select an image to upload", 400));
  }
};

//setting up the multer
const upload = multer({
  storage: imageStorage,
  fileFilter: multerFilter,
});

//adding handler for uploading the file
exports.uploadProjImg = upload.single("photo");

//handler for resizing the image
exports.resizeProjImg = (req, res, next) => {
  if (req.file) {
    //make the directory ifit does not exists
    const directory = "public/images/projects";

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    req.file.filename = `projects-${req.user._id}-${Date.now()}.jpeg`;
    //apply the resize
    sharp(req.file.buffer)
      .resize(
        parseInt(process.env.PROJECT_IMAGE_WIDTH), //passing the values for height and width from config file
        parseInt(process.env.PROJECT_IMAGE_HEIGHT)
      )
      .toFormat("jpeg")
      .toFile(`${directory}/${req.file.filename}`);
  }

  next();
};

//adding the projects
exports.addProject = async (req, res, next) => {
  //- Allowed only to loginedIN User presen tin req.user
  //1)Check if req constains the body
  if (!req.body) {
    return next(new appError("Provide details of the project", 400));
  }
  //appending user ID with the req.body
  req.body.user = req.user._id;

  let newProject;
  try {
    newProject = await Projects.create(req.body);
  } catch (err) {
    if (err.message.includes("duplicate key error collection")) {
      return next(new appError("Project already exists with same title", 500));
    } else {
      return next(new appError("Project NOT aaded", 500));
    }
  }

  res.status(201).json({ message: "Project Added", newProject });
};

//getting the projects of current user
exports.getMyProjects = async (req, res, next) => {
  let myProjects;
  try {
    myProjects = await Users.findById(req.user._id)
      .select("name email cnic")
      .populate({
        path: "projects",
        select: "-__v",
      });
  } catch (err) {
    return next(new appError("Could NOT search for projects!!", 500));
  }

  if (!myProjects) {
    return next(new appError("Projects NOT found!!", 404));
  }

  res
    .status(200)
    .json({ message: "Found", count: myProjects.projects.length, myProjects });
};

//update the project using the IDclea
exports.updateMyProject = async (req, res, next) => {
  //console.log(req.body);

  //2)- Check if body is given

  if (Object.keys(req.body).length === 0 && !req.file) {
    //get all keys in the req.body object(if any)
    return next(new appError("Body is empty", 400));
  }
  //3)- adding the image file name(if selected by user) to the req.body

  if (req.file) {
    req.body.images = req.file.filename;
  }

  //4)- update the project using the id passed in parameter

  let updateProj;

  try {
    updateProj = await Projects.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
  } catch (err) {
    if (err.message.includes("Plan executor error during findAndModify")) {
      return next(new appError("Project already exists", 400));
    }
    console.log(err.message);
    return next(new appError("Error in updating the project", 400));
  }

  res.status(200).json({ message: "updated", updateProj });
};

exports.deleteMyProject = async (req, res, next) => {
  let deleteDoc;
  try {
    deleteDoc = await Projects.findByIdAndDelete(req.params.id);
  } catch (err) {
    console.log(err.message);
    return next(new appError("Project is not deleted!!"));
  }

  //check if deleteDoc contains the deleted document
  if (!deleteDoc) {
    return next(new appError("Project NOT found"));
  }

  res.status(204).json({ message: "Deleted", data: null });
};

//get user Projects (by admin)
exports.getUserProjects = async (req, res, next) => {
  if (!req.body.email) {
    return next(new appError("provide email in the body", 400));
  }

  let userProjects;
  try {
    userProjects = await Users.findOne({ email: req.body.email })
      .select("name email cnic")
      .populate({
        path: "projects",
        select: "-__v -_id ",
      });
  } catch (err) {
    console.log(err.message);
    return next(new appError("Could NOT search for projects", 400));
  }

  if (!userProjects) {
    return next(new appError("Projects NOT found", 404));
  }

  res.status(200).json({
    message: "Found",
    count: userProjects.projects.length,
    userProjects,
  });
};
