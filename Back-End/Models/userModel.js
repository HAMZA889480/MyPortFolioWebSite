const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const appError = require("../error");
const validator = require("validator");

const Education = require("../Models/eduModel");

//creating a schema for users
const userSchema = new mongoose.Schema(
  {
    name: { required: [true, "Name is required"], type: String },
    email: {
      validate: [validator.isEmail, "Enter a valid email"],
      required: [true, "Email is required"],
      unique: [true, "User Exists with this email"],
      type: String,
    },
    password: {
      minlength: [8, "Min-length of password is 8"],
      required: [true, "password is required"],
      type: String,
    },
    phone: {
      required: [true, "Phone is required"],
      unique: [true, "Phone already exist"],
      type: String,
    },

    designation: { type: String },
    image: { type: String, default: "default.jpeg" },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    //embadding the education document
    education: [Education],
    active: { type: Boolean, default: true },
    //adding the experience ID for child refrencing
    experience: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Experience",
        justOne: false,
      },
    ],

    passwordChangeAt: Date,
    passwordRestToken: String,
    passwordRestDuration: Date,
  },
  //enabling the virtualization
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//creating index on email and phone
// Create indexes for unique fields
userSchema.index({ email: 1, phone: 1 }, { unique: true });

//virtually populate the projects of user
userSchema.virtual("projects", {
  ref: "Projects",
  foreignField: "user",
  localField: "_id",
});

//bycrupt the password
userSchema.pre("save", async function (next) {
  //password is going to update

  //check if password is modified or not
  if (!this.isModified("password")) {
    return next();
  }
  //passowrd is modified
  try {
    this.password = await bcrypt.hash(this.password, 12);
  } catch (err) {
    console.log(err.message);
    next(new appError("Password is not Hashed", 500));
  }
});

//instant method for checking the password
userSchema.methods.matchPassword = async (userPassword, dbPassword) => {
  return await bcrypt.compare(userPassword, dbPassword);
};

//This method will create a random OTP of 5 digits.
//Encrypt the OTP and save it is DB. Also save the time on which the
//OTP was issued.
userSchema.methods.createOTP = async function () {
  //generating a five digit number and convert it to string
  let OTP = Math.floor(1000000 + Math.random() * 9000000).toString();

  //crypting the OTP to save in Db
  this.passwordRestToken = await bcrypt.hash(OTP, 12);

  //console.log(this.passwordRestToken);
  //restting up the time for OTP
  this.passwordRestDuration = Date.now() + 10 * 60 * 1000;

  //saving the changes to DB

  return OTP;
};

//creating a model using the schema
const Users = mongoose.model("Users", userSchema);

//exporting the users to perform CRUD in controller
module.exports = Users;
