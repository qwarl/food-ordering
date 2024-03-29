import { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true },
);

UserSchema.post("validate", function (user) {
  const notHashedPass = user.password;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(notHashedPass, salt);
});

export const User = models?.User || model("User", UserSchema);
