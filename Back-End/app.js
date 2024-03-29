const express = require("express");
const morgan = require("morgan");
const appError = require("./error");
const cors = require("cors");
const globalerrorHandler = require("./Controllers/globalErrorHandler");

const userRouter = require("./Routes/userRouter");
const educationRouter = require("./Routes/eduRouter");
const experienceRouter = require("./Routes/expRouter");
const projectsRouter = require("./Routes/projRouter");
const app = express();

//setting up the cors
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//adding user routers as a middle-ware
app.use("/portfolio/v1/users", userRouter);

//adding the education router as a middle-ware
app.use("/portfolio/v1/education", educationRouter);

//adding the experience router as a middle-ware
app.use("/portfolio/v1/experience", experienceRouter);
//adding the project router as a middle-ware
app.use("/portfolio/v1/projects", projectsRouter);

//handling error for undefined handler
app.use("*", (req, res, next) => {
  return next(
    new appError(`Cannot find request for URL ${req.originalUrl}`, 400)
  );
});

//error handling middle-warew
//This middle-ware is automatically called when an error occured
app.use(globalerrorHandler);

module.exports = app;
