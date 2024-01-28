const mongoose = require("mongoose");

//creating the schema
const expSchema = new mongoose.Schema({
  orginization: {
    type: String,
    required: [true, "Provide the orginization name"],
  },
  startDate: {
    type: Date,
    required: [true, "Provide the starting date"],
  },
  endDate: {
    type: Date,
  },
  position: {
    type: String,
    required: [true, "provid ethe position where you work"],
  },
  projects: {
    type: Array,
    reuiqred: [true, "Provides the projects on which you work"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
});

//adding compound Index on originization and position
//NO user can enter  same position in same originization twice
expSchema.index({ orginization: 1, position: 1, user: 1 }, { unique: true });

//creating the model of the experience schema
const Experience = mongoose.model("Experience", expSchema);

//exporting the Experience
module.exports = Experience;
