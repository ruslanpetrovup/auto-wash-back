import { model, Schema } from "mongoose";

const userSchema = new Schema({
  idUser: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  numbersCar: {
    type: Array,
  },
  balance: {
    type: String,
    required: true,
  },
  balanceWash: {
    type: Object,
  },
  historyPayment: {
    type: Array,
  },
});

const User = model("client", userSchema);

export default User;
