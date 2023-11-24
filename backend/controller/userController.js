const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await User.findByIdAndRemove(id);
    res.sendStatus(204).json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function login(req, res) {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.password !== password)
      return res.status(401).json({ error: "Invalid Credentials" });

    const token = generateToken(user);

    return res.status(200).json({
      message: "Logged in successfully",
      userName: userName,
      userId: user._id,
      role: user.role,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function generateToken(user) {
  const payload = {
    role: user.role,
    id: user._id,
  };
  const token = jwt.sign(payload, "adsfasdfjkh$#asdfasdf.adsfxc");
  return token;
}

function adminDashboard(req, res) {
  return res.status(200).json({ message: "Welcome to admin Dashboard" });
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  login,
  adminDashboard,
};
