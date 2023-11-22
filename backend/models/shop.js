const mongoose = require("mongoose");
const { Schema } = mongoose;

const shopSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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

    // stripe_account_id: "",
    // stipe_seller: {},
    // stipeSession: {},
    // passwordResetCode: {
    //   data: String,
    //   default: "",
    // },
    Active: {
      type: Boolean,
      default: true,
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model("shop", shopSchema);

// export default mongoose.model("shop", shopSchema);
