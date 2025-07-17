
const express=require('express');
const Issue=require('../Models/issueSchema')
const errorHandler=require('../Middleware/errorMiddleware');

const router = express.Router();


router.post("/", async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ ok: false, message: "Description is required" });
  }

  try {
    const newIssue = new Issue({ description });
    await newIssue.save();
    res.status(201).json({ ok: true, message: "Issue reported successfully" });
  } catch (error) {
    console.error("Error reporting issue:", error);
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
});

// GET all issues
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    console.error("Error fetching issues:", err);
    res.status(500).json({ message: "Failed to fetch issues" });
  }
});


router.use(errorHandler);

module.exports=router;