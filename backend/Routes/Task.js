const express=require('express');
const Task=require('../Models/taskSchema');
const errorHandler=require('../Middleware/errorMiddleware');

const router = express.Router();



router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }); // latest first
    res.json({ ok: true, tasks });
  } catch (err) {
    next(err)
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ ok: false, message: "Title is required" });
    }

    const newTask = new Task({ title, description });
    const savedTask = await newTask.save();

    res.status(201).json({ ok: true, task: savedTask });
  } catch (err) {
    next(err)
  }
});

// PATCH /tasks/:id/complete
router.patch('/:id/complete', async (req, res) => {
  try {
    const taskId = req.params.id;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed: true },
      { new: true } // returns the updated document
    );

    if (!updatedTask) {
      return res.status(404).json(createResponse( false,'Task not found'));
    }

    res.json({ ok: true, message: 'Task marked as completed', data: updatedTask });
  } catch (err) {
    next(err)
  }
});

// backend/routes/tasks.js or similar
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ ok: false, message: "Task not found" });
    }

    res.json({ ok: true, task: updatedTask });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
});


router.use(errorHandler);

module.exports=router;