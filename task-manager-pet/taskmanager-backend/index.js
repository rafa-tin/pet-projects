import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "./models/User.js";
import Task from "./models/Task.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Auth middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.userId = user.id;
    next();
  });
}

// Регистрация
app.post("/api/register", async (req, res) => {
  const { name, phone, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ name, phone, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ id: newUser._id, email: newUser.email });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Email must be unique" });
  }
});

// Логин
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, user: { id: user._id, email: user.email, name: user.name, phone: user.phone } });

});

// Получить таски
app.get("/api/tasks", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// Добавить таск
app.post("/api/tasks", authMiddleware, async (req, res) => {
  const { name, description, priority, status, due_date } = req.body;
  const task = new Task({
    name,
    description,
    priority,
    status,
    due_date,
    userId: req.userId
  });
  await task.save();
  res.status(201).json(task);
});

// Обновить таск
app.put("/api/tasks/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const updated = await Task.findOneAndUpdate(
    { _id: id, userId: req.userId },
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Удалить таск
app.delete("/api/tasks/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  await Task.findOneAndDelete({ _id: id, userId: req.userId });
  res.json({ message: "Deleted" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
