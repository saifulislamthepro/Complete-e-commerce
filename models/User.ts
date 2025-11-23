import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // only for manual signup
    image: { type: String }, // Google OAuth profile image
    provider: { type: String, default: "credentials" },
    role: {type: String, default: "user"},
    resetOtp: {type: String},
    resetOtpExpire: {type: Date},
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
