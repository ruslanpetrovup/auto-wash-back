import payload from "payload";
import CheckCode from "../../db/SchemaCheckCode";
import sendSMS from "../../utils/sendSMS";

const returnDate = () => {
  const date = new Date();
  const formattedDate = date.toISOString();
  console.log(formattedDate);

  return formattedDate;
};

const checkCode = async (req: any, res: any) => {
  const { number } = req.body;

  if (!number) return res.status(400).send("Not enough arguments");

  try {
    const code = Math.floor(Math.random() * 9000) + 1000;

    const numberCodes = await CheckCode.findOne({ number: number });

    if (numberCodes === null || numberCodes === undefined) {
      await CheckCode.create({
        number: number,
        code: String(code),
      });

      await sendSMS(number, `Ваш код ${String(code)}`);

      await payload.create({
        collection: "log-sms",
        data: { phone: number, date: returnDate() },
      });

      return res.status(200).send("Code Send");
    } else {
      await CheckCode.findByIdAndUpdate(numberCodes._id, {
        code: String(code),
      });

      await sendSMS(number, `Ваш код ${String(code)}`);

      await payload.create({
        collection: "log-sms",
        data: { phone: number, date: returnDate() },
      });

      return res.status(200).send("Code Send");
    }
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

export default checkCode;
