import jwt from "jsonwebtoken";
import CheckCode from "../../db/SchemaCheckCode";
import User from "../../db/SchemaUser";
import payload from "payload";

const login = async (req: any, res: any) => {
  const { number, code } = req.body;

  if (!number || !code) return res.status(400).send("Not enough arguments");

  try {
    const numberCode = await CheckCode.findOne({ number: number });

    if (!numberCode) {
      return res.status(404).send("Number Not Found");
    } else {
      if (numberCode.code === code) {
        const user = await User.findOne({ phone: number });
        const userScore = await User.find();

        if (!user) {
          const newUser = await User.create({
            idUser: String(userScore.length + 1),
            email: "",
            firstName: "",
            lastName: "",
            phone: number,
            numbersCar: [],
            balance: "0",
            balanceWash: [],
            historyPayment: [],
          });

          await CheckCode.findByIdAndDelete(numberCode._id);
          const payloadToken = newUser.phone;
          const token = await jwt.sign(payloadToken, process.env.TOKEN_KEY);

          return res.status(201).send(token);
        } else {
          await CheckCode.findByIdAndDelete(numberCode._id);

          const payload = { phone: number };
          const token = await jwt.sign(payload, process.env.TOKEN_KEY);

          return res.status(200).send(token);
        }
      } else {
        return res.status(404).send("Code Not Correct");
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

export default login;
