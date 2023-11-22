const User = require("../models/user");
const shop = require("../models/shop");
// const { hashPassword } = require("../utils/auth");

const Addshop = async (req, res) => {
  try {
    // Create a user record
    const { password, ...userData } = req.body;
    // const hashedPassword = await hashPassword(password);

    const user = new User({
      ...userData,
      password: password,
    });
    await user.save();

    // Create a shop record and associate it with the user
    const newshop = new shop({
      user: user._id,
      ...req.body, // Include other shop-related attributes here
    });
    await newshop.save();

    res.status(201).json(shop);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the shop." });
  }
};

const getshops = async (req, res) => {
  try {
    const shops = await shop.find();
    return res.json(shops);
  } catch (error) {}
};

const getshopsId = async (req, res) => {
  try {
    const shops = await shop.find();
    const shopsId = shops.map((u) => u._id);
    res.status(200).json(shopsId);
  } catch (error) {}
};

const getshopByUserId = async (req, res) => {
  try {
    // Use the shop model to find the shop based on the user._id
    const shop = await shop.findOne({}).populate("user");

    if (!shop) {
      return res.status(404).json({ message: "shop not found for this user" });
    }

    // Access the user._id and compare it with the provided userId
    if (shop.user._id.toString() === req.params.id) {
      res.json(shop);
    } else {
      return res.status(404).json({ message: "shop not found for this user" });
    }
  } catch (error) {}
};

const getshop = async (req, res) => {
  try {
    const shops = await shop.findOne({ _id: req.params.id }).populate("user");
    res.status(200).json(shops);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the list of shops." });
  }
};

const editshop = async (req, res) => {
  try {
    const shopId = req.params.id;
    const updatedData = req.body;
    // Update the shop's information

    const updatedshop = await shop.findByIdAndUpdate(
      { _id: shopId },
      updatedData,
      { new: true }
    );
    console.log(updatedData);

    if (!updatedshop) {
      return res.status(404).json({ error: "shop not found" });
    }

    // Update the associated user information
    const userId = updatedshop.user;
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      updatedData,
      { new: true }
    );

    res.status(200).json({ shop: updatedshop, User: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the shop." });
  }
};

const delshop = async (req, res) => {
  try {
    const shop = await shop.findOneAndDelete({ _id: req.params.id });
    return res.json(shop);
  } catch (error) {}
};

module.exports = {
  Addshop,
  getshops,
  getshopsId,
  getshopByUserId,
  getshop,
  editshop,
  delshop,
};
