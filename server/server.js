const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const passportRouter = require("./routes/passportRouter");

require("dotenv").config();
const { PORT } = process.env;

//Parsing the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use("/auth/google", passportRouter);

// bad route error handling
app.use((req, res) => {
  console.log("we are in a bad route");
  res.sendStatus(418);
});

// global error handling
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
