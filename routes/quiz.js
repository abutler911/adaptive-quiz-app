const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Get a question
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find()
      .sort({ difficulty: -1, timesShown: 1 })
      .limit(1); // Fetch the least comfortable question
    res.render("quiz", { question: questions[0] });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Submit a comfort rating
router.post("/rate", async (req, res) => {
  const { questionId, comfortLevel } = req.body;
  try {
    const question = await Question.findById(questionId);
    question.timesShown += 1;
    question.difficulty = comfortLevel;
    await question.save();
    res.redirect("/quiz");
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
