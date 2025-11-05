const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/authMiddleware");

// REGISTER
router.post("/register", async (req, res) => {
	try {
		const { username, email, password } = req.body || {};
		if (!username || !email || !password)
			return res.status(400).json({ message: "All fields required" });

		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(400).json({ message: "User already exists" });

		const hashPassword = await bcrypt.hash(password, 10);
		const user = new User({ username, email, password: hashPassword });
		await user.save();

		res.status(201).json({ message: "User Registered Successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
});

// LOGIN
router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body || {};
		if (!email || !password)
			return res.status(400).json({ message: "Email and Password required" });

		const user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({ message: "Invalid email or password" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid email or password" });

		const token = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.json({
			message: "Login Successful",
			token,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" });
	}
});

// PROTECTED ROUTE
router.get("/dashboard", verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		if (!user) return res.status(404).json({ message: "User not found" });

		res.json({
			message: `Welcome to Dashboard, ${user.username}!`,
			user,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;
