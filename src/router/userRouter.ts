import { Router } from "express";
import {
  addAuto,
  changeEmail,
  changeName,
  changePhone,
  deleteUser,
  checkCode,
  login,
  verify,
  payment,
  createOrderPayment,
} from "../service/user";
import createOrderNotRegister from "../service/user/createOrderNotRegister";
import paymentNotRegister from "../service/user/paymentNotRegister";
const router = Router();

router.post("/change-phone", changePhone);
router.post("/change-name", changeName);
router.post("/change-email", changeEmail);
router.post("/add-auto", addAuto);
router.post("/delete", deleteUser);
router.post("/check-code", checkCode);
router.post("/login", login);
router.post("/verify", verify);
router.post("/payment", payment);
router.post("/payment-not-register", paymentNotRegister);
router.post("/payment-create", createOrderPayment);
router.post("/payment-create-not-register", createOrderNotRegister);

export default router;
