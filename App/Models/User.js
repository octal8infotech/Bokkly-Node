import { model, Schema } from "mongoose";
export const imagePath = "public/uploads/User";
const formatImage = (image) => {
  return `${process.env.IMAGE_URL}/User/${image}`;
}
export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, default: 'user.png',get: formatImage  },
    number: { type: String, default: null },
    address: { type: String, default: null },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
  }
);
export default model("User", UserSchema);
