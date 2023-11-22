import mongoose from "mongoose";
const { Schema } = mongoose;

const doctorSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    firstname: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
    },
    qualification: {
      type: String,
      trim: true,
      required: true,
    },
    specialties: {
      type: String,
      trim: true,
      required: true,
    },
    experience: {
      type: String,
      trim: true,
      required: true,
    },

    stripe_account_id: "",
    stipe_seller: {},
    stipeSession: {},
    passwordResetCode: {
      data: String,
      default: "",
    },
    Active: {
      type: Boolean,
      default: true,
    },
  },

  { timestamps: true }
);

export default mongoose.model("Doctors", doctorSchema);
