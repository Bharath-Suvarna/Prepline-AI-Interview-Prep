import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, skills, targetRole, resumeUrl, githubUrl } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email: email.toLowerCase().trim(),
      passwordHash,
      phone: phone || "",
      skills: skills || "",
      targetRole: targetRole || "Software Engineer",
      resumeUrl: resumeUrl || "",
      githubUrl: githubUrl || ""
    });

    const secret = process.env.JWT_SECRET || "fallback_secret";
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, name: newUser.name },
      secret,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        skills: newUser.skills,
        targetRole: newUser.targetRole,
        resumeUrl: newUser.resumeUrl,
        githubUrl: newUser.githubUrl
      }
    });
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({ error: "Server error during registration." });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const secret = process.env.JWT_SECRET || "fallback_secret";
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      secret,
      { expiresIn: "1h" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        skills: user.skills || "",
        targetRole: user.targetRole || "Software Engineer",
        resumeUrl: user.resumeUrl || "",
        githubUrl: user.githubUrl || ""
      }
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ error: "Server error during login." });
  }
});

export default router;
