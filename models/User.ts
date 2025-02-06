import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: "" },
  emailVerified: { type: Boolean, default: false },
}, { timestamps: true });

const User = models.User || model("User", UserSchema);
export default User;
