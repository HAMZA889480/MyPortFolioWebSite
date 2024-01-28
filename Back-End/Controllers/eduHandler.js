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

    //Degree not found
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

//update specific eduaction (done by admin)
exports.updateEducation = async (req, res, next) => {
  // 1)- Check that email and title are present in query
  if (!req.query.email || !req.query.title) {
    return next(new appError("email or Title of degree is missing", 400));
  }

  // 2)- Fetch the user document using email and check if document exist
  const user = await findUserDocument("email", req.query.email);

  if (!user) {
    return next(new appError("User does not exist with this email", 404));
  }

  user.education.forEach((element, index) => {
    if (element.title == req.query.title) {
      //index contains the position in education array where to change the details

      const updatedObj = { ...element, ...req.body };
      Object.assign(user.education[index], updatedObj);
      try {
        modifiedUser = user.save();
      } catch (err) {
        console.log(err.message);
        return next(new appError("Education is not modified"));
      }
    }
    index;
  });

  res.status(200).json({ message: "updated", updatedUser: await modifiedUser });
};

//remove education (done by admin)
exports.removeEducation = async (req, res, next) => {
  //1)- Logined User is admin or not

  //2)- email and title provided or not
  if (!req.body.email || !req.body.title) {
    return next(
      new appError("Provide email of user and title of degree to delete!")
    );
  }

  // 3)- get the user document by calling the function
  const userDoc = await findUserDocument("email", req.body.email);

  if (!userDoc) {
    return next(new appError("User not found!!", 404));
  }

  let eduModified;
  userDoc.education.forEach(async (eachEdu, index) => {
    if (eachEdu.title == req.body.title) {
      //title match.
      //remove the current education which is present at position index in userDoc.education array
      //we use splice method

      userDoc.education.splice(index, 1);

      try {
        eduModified = userDoc.save({
          validateBeforeSave: true,
          new: true,
        });
      } catch (err) {
        return next(new appError("Degree is NOT removed!", 500));
      }
    }
    index++;
  });

  res.status(200).json({ message: "Degree removed", data: await eduModified });
};
