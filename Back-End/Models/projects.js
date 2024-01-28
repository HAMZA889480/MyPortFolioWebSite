const mongoose = require("mongoose");
//creating projects schema
const projSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Provide the title for Project"],
  },
  description: {
    type: String,
    required: [true, "Provide description for Project"],
  },
  technologies: {
    type: Array,
    required: [true, "Provide appriopriate tech tags for Project"],
  },
  images: {
    type: String,
  },

  //adding user id for refrencing(Parent refrencing)
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
});

//adding compound indexes for unqiue title and user (user id)
//NO user can add two project with same title

projSchema.index({ title: 1, user: 1 }, { unique: true });

//Creating model form schmea
const Projects = mongoose.model("Projects", projSchema);

//exporing the model
module.exports = Projects;
