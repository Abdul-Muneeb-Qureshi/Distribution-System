import User from "../models/user";
import Doctor from "../models/doctors";
import { hashPassword } from "../utils/auth";

export const AddDoctor = async (req, res) => {
  try {
    // Create a user record
    const { password, ...userData } = req.body;
    const hashedPassword = await hashPassword(password);

    const user = new User({
      ...userData,
      password: hashedPassword,
    });
    await user.save();

    // Create a doctor record and associate it with the user
    const doctor = new Doctor({
      user: user._id,
      ...req.body, // Include other doctor-related attributes here
    });
    await doctor.save();

    res.status(201).json(doctor);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the doctor." });
  }
};
export const getDoctors = async (req, res) => {
  // console.log("Hello");
  try {
    const doctors = await Doctor.find();
    return res.json(doctors);
  } catch (error) {}
};

export const getDoctorsId = async (req, res) => {
  // console.log("Hello");
  try {
    const doctors = await Doctor.find();
    const doctorsId = doctors.map((u) => u._id);
    res.status(200).json(doctorsId);
  } catch (error) {}
};

export const getDoctorByUserId = async (req, res) => {
  try {
    // Use the Doctor model to find the doctor based on the user._id
    const doctor = await Doctor.findOne({}).populate("user");

    if (!doctor) {
      return res
        .status(404)
        .json({ message: "Doctor not found for this user" });
    }

    // Access the user._id and compare it with the provided userId
    if (doctor.user._id.toString() === req.params.id) {
      res.json(doctor);
    } else {
      return res
        .status(404)
        .json({ message: "Doctor not found for this user" });
    }
  } catch (error) {}
};

export const getDoctor = async (req, res) => {
  try {
    const doctors = await Doctor.findOne({ _id: req.params.id }).populate(
      "user"
    );
    res.status(200).json(doctors);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the list of doctors." });
  }
};

export const editDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const updatedData = req.body;
    // Update the doctor's information

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      { _id: doctorId },
      updatedData,
      { new: true }
    );
    console.log(updatedData);

    if (!updatedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Update the associated user information
    const userId = updatedDoctor.user;
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      updatedData,
      { new: true }
    );

    res.status(200).json({ Doctor: updatedDoctor, User: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the doctor." });
  }
};
export const delDoctor = async (req, res) => {
  // console.log("Hello");
  // console.log(req.params.id);
  try {
    const doctor = await Doctor.findOneAndDelete({ _id: req.params.id });
    return res.json(doctor);
  } catch (error) {}
};
