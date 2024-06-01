import mongoose from "mongoose";

const userLoginSchema = new mongoose.Schema({
  ddd: {
    type: String,
    required: true,
    // Add additional validations if necessary
  },
  numero: {
    type: String,
    required: true,
    // Add additional validations if necessary
  },
});

const UserLogin = mongoose.model("UserLogin", userLoginSchema);

export { UserLogin };
