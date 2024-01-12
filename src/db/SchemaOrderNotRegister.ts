import { model, Schema } from "mongoose";

const OrderPaymentNotRegisterSchema = new Schema({
  orderId: {
    type: String,
    required: true,
  },
  washId: {
    type: String,
    required: true,
  },
  washNumberPost: {
    type: String,
    required: true,
  },
  titleWash: {
    type: String,
    required: true,
  },
  addressWash: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const OrderPaymentNotRegister = model(
  "order-payment-not-register",
  OrderPaymentNotRegisterSchema
);

export default OrderPaymentNotRegister;
