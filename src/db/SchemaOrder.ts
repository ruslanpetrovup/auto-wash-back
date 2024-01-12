import { model, Schema } from "mongoose";

const OrderPaymentSchema = new Schema({
  orderId: {
    type: String,
    required: true,
  },
  washId: {
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
  number: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const OrderPayment = model("order-payment", OrderPaymentSchema);

export default OrderPayment;
