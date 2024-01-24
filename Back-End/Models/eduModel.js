const mongoose = require("mongoose");

//creating schema for education
const eduSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: [true, "This education exists"],
    required: [true, "Provide Title for Your education"],
  },
  completionYear: {
    type: String,
    required: [true, "Provide the completion date"],
  },
  group: { type: String, required: [true, "Provide your Group"] },
  board: { type: String, required: [true, "Provide your Board Name"] },
});

//create model from this schema
//const eduModel = new mongoose.model("Education", eduSchema);

//export the EduModel
module.exports = eduSchema;
