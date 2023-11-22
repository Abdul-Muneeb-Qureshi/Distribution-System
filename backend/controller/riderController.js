const User = require("../models/user");
const rider = require("../models/rider");
// const { hashPassword } = require("../utils/auth");

const Addrider = async (req, res) => {
  try {
    // Create a user record
    const { password, ...userData } = req.body;
    // const hashedPassword = await hashPassword(password);

    const user = new User({
      ...userData,
      password: password,
    });
    await user.save();

    // Create a rider record and associate it with the user
    const newrider = new rider({
      user: user._id,
      ...req.body, // Include other rider-related attributes here
    });
    await newrider.save();

    res.status(201).json(rider);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the rider." });
  }
};

const getriders = async (req, res) => {
  try {
    const riders = await rider.find();
    return res.json(riders);
  } catch (error) {}
};

const getridersId = async (req, res) => {
  try {
    const riders = await rider.find();
    const ridersId = riders.map((u) => u._id);
    res.status(200).json(ridersId);
  } catch (error) {}
};

const getriderByUserId = async (req, res) => {
  try {
    // Use the rider model to find the rider based on the user._id
    const rider = await rider.findOne({}).populate("user");

    if (!rider) {
      return res.status(404).json({ message: "rider not found for this user" });
    }

    // Access the user._id and compare it with the provided userId
    if (rider.user._id.toString() === req.params.id) {
      res.json(rider);
    } else {
      return res.status(404).json({ message: "rider not found for this user" });
    }
  } catch (error) {}
};

const getrider = async (req, res) => {
  try {
    const riders = await rider.findOne({ _id: req.params.id }).populate("user");
    res.status(200).json(riders);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the list of riders." });
  }
};

const editrider = async (req, res) => {
  try {
    const riderId = req.params.id;
    const updatedData = req.body;
    // Update the rider's information

    const updatedrider = await rider.findByIdAndUpdate(
      { _id: riderId },
      updatedData,
      { new: true }
    );
    console.log(updatedData);

    if (!updatedrider) {
      return res.status(404).json({ error: "rider not found" });
    }

    // Update the associated user information
    const userId = updatedrider.user;
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      updatedData,
      { new: true }
    );

    res.status(200).json({ rider: updatedrider, User: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the rider." });
  }
};

const delrider = async (req, res) => {
  try {
    const rider = await rider.findOneAndDelete({ _id: req.params.id });
    return res.json(rider);
  } catch (error) {}
};

module.exports = {
  Addrider,
  getriders,
  getridersId,
  getriderByUserId,
  getrider,
  editrider,
  delrider,
};
