const bcrypt = require("bcrypt");
const UserRegModel = require("../models/user.model");

const userregistraion = async (req, res) => {
  try {
    const { emailid, username, password } = req.body;
    if (!emailid || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserRegModel.findOne({ $or: [{ emailid }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already registered" });
    }

    const newUser = new UserRegModel({ emailid, username, password });
    await newUser.save();

    res.status(201).json({ message: "User successfully registered" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const userlogin = async (req, res) => {
  try {
    const { emailid, username, password } = req.body;
    if (!password || (!username && !emailid)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await UserRegModel.findOne({ $or: [{ username }, { emailid }] });
    if (!user) {
      return res.status(400).json({ message: "User not registered" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful" ,
      user:{
      username:user.username,
      email:user.emailid

    }});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { userregistraion, userlogin };
