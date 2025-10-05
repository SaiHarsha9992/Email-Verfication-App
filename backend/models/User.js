import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  accountId: { type: String },
  verificationToken: String,
  tokenExpiry: Date,
});

export default mongoose.model("User", userSchema);
