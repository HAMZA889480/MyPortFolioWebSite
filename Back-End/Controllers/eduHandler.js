const appError = require("../error");
const Users = require("../Models/userModel");

//method for finding the user document
async function findUserDocument(key, value) {
  let doc;

  //creating a query object
  let query = {};
  query[key] = value;
  // console.log(query);

  //now passing the query object in the findOne methode
  try {
    doc = await Users.findOne(query);
  } catch (err) {
    return next(new appError(err.message, 500));
  }

  return doc;
}

//adding the education
exports.addEducation = async (req, res, next) => {
  //logined User is saved in req.user

  let user;
  try {
    // Check if the title already exists in the education array
    const titleExists = await Users.findOne({
      _id: req.user._id,
      "education.title": req.body.title,
    });

    if (titleExists) {
      return next(new appError("Degree Already exists", 400));
    }

    //Degree not found. Now create a new education
    user = await Users.findByIdAndUpdate(
      req.user._id,
      {
        $push: { education: req.body },
      },
      {
        new: true, // to return the modified document
        runValidators: true, // to run validators on update
      }
    );
  } catch (err) {
    console.error(err.message);
    return next(new appError(err.message, 500));
  }

  res.status(200).json({ status: "Education Added!!", user });
};

//getting all the education of current user
exports.getAllEducation = async (req, res, next) => {
  //we have the id of currently logedIN user

  //1)- Find the document using the id
  let document = await findUserDocument("_id", req.user._id);

  //2)- Retrive the education from the document
  const allEducation = document.education;

  //check if no education found

  if (allEducation.length == 0) {
    return next(new appError("No education Found", 404));
  }
  //3)- Display the education
  res.status(200).json({ message: "Success", compEducation: allEducation });
};

//get a specific education details of current user
exports.findEducation = async (req, res, next) => {
  //logned In user is stored in req.user

  //1)- Find the document
  let eduDoc = await findUserDocument("_id", req.user._id);

  if (eduDoc.education.length == 0) {
    return next(new appError("No education record found", 404));
  }
  let searchEdu;
  eduDoc.education.map((eachEdu) => {
    //convert the string to lower case before matching to get better results
    if (eachEdu.title.toLocaleLowerCase() == req.params.title.toLowerCase()) {
      searchEdu = eachEdu;
    }
  });

  res.status(200).json({ message: "Found", searchEdu });
};

//update specific eduaction
exports.updateEducation = async (req, res, next) => {
  let modifiedEdu;

  //modify the education using the id of the education document
  try {
    modifiedEdu = await Users.findOneAndUpdate(
      {
        _id: req.user._id,
        "education._id": req.params.id,
      },
      {
        $set: {
          "education.$.title": req.body.title,
          "education.$.institute": req.body.institute,
          "education.$.completionYear": req.body.completionYear,
          "education.$.group": req.body.group,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } catch (err) {
    if (err.message.includes("Cast to ObjectId failed")) {
      //if the id is not found
      return next(new appError("Education not found", 500));
    }
    return next(new appError("Error in updating the education", 500));
  }

  if (!modifiedEdu) {
    return next(new appError("Education is not modified"));
  }
  res.status(200).json({ message: "updated", updatedUser: modifiedEdu });
};

//remove education of current user
exports.removeEducation = async (req, res, next) => {
  let eduModified;
  //remove the education using the id of the education document
  try {
    eduModified = await Users.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      {
        $pull: { education: { _id: req.params.id } },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } catch (err) {
    if (err.message.includes("Cast to ObjectId failed")) {
      //if the id is not found
      return next(new appError("Education not found", 500));
    }
    return next(new appError("Error in removing the education", 500));
  }

  if (!eduModified) {
    return next(new appError("Education is not removed"));
  }

  res.status(200).json({ message: "Degree removed", data: await eduModified });
};
