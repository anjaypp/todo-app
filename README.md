const express = require("express");
const router = express.Router();
const todoModel = require("../models/todoModel");

//Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create a todo
router.post("/add", async (req, res) => {
  const todo = new todoModel(req.body);
  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Created a todo successfully", todo: newTodo });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a todo
router.put("/update/:id", async (req, res) => {
  try {
    const todo = await todoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Updated todo successfully", todo: todo });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete a todo
router.delete("/delete/:id", async (req, res) => {
  try {
    const todo = await todoModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted todo successfully", todo: todo });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;