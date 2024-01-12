import { model, Schema } from "mongoose";

const CheckCodeSchema = new Schema({
  number: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const CheckCode = model("check-code", CheckCodeSchema);

export default CheckCode;
