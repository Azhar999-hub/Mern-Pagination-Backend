import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  FatherName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
});

const UsersModel = mongoose.model("user", UserSchema);

export default UsersModel;
