const mongoose = require("mongoose");

//creating schema for education
const eduSchema = new mongoose.Schema({
  title: {
    type: String,

    required: [true, "Provide Title for Your education"],
  },
  completionYear: {
    type: String,
    required: [true, "Provide the completion date"],
  },
  group: { type: String, required: [true, "Provide your Group"] },
  institute: { type: String, required: [true, "Provide your Board Name"] },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
});

//export the EduModel
module.exports = eduSchema;
