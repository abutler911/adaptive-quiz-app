const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/adaptiveQuizApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as templating engine
app.set("view engine", "ejs");

// Routes
const quizRoutes = require("./routes/quiz");
app.use("/quiz", quizRoutes);

app.get("/", (req, res) => {
  res.redirect("/quiz");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
