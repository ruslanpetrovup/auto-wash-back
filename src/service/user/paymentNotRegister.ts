import payload from "payload";
import OrderPayment from "../../db/SchemaOrderNotRegister";
const { spawn } = require("child_process");

const returnDate = () => {
  const date = new Date();
  const formattedDate = date.toISOString();
  console.log(formattedDate);

  return formattedDate;
};

const paymentNotRegister = async (req, res) => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear().toString();

  if (req.query.order === undefined) {
    return res.status(400).send("Not enough arguments");
  }

  try {
    const payment_id = req.query.order;

    const orderPayment = await OrderPayment.findOne({ orderId: payment_id });

    if (orderPayment === undefined) {
      return res.status(404).send("Not Found");
    }
    if (orderPayment.status === "success") {
      return res.status(404).send("Not Found");
    }

    const python_script = "src/service/user/pay/paymentLiqpay.py";

    const python_process = spawn("python3", [python_script, payment_id]);

    python_process.stdout.on("data", async (data) => {
      const dataString = await data.toString();
      const replace1 = dataString.replace(/'/g, '"');
      const replace2 = replace1.replace("False", "false");
      const replace3 = replace2.replace("True", "true");

      const total = await JSON.parse(replace3);

      console.log(total);

      if (total.status === "error") {
        await OrderPayment.findByIdAndUpdate(orderPayment._id, {
          status: "error",
        });

        return res.redirect(
          `https://auto-wash-psi.vercel.app/wash/${orderPayment.washId}`
        );
      }

      // await payload.create({
      //   collection: "payments",
      //   data: {
      //     number: user.phone,
      //     sum: total.amount,
      //   },
      // });

      //   await payload.create({
      //     collection: "log-payment",
      //     data: {
      //       phone: user.phone,
      //       amount: total.amount,
      //       date: returnDate(),
      //     },
      //   });
      //   console.log(user.phone);

      await OrderPayment.findByIdAndUpdate(orderPayment._id, {
        status: "success",
      });

      // --------------------

      //   Request Send WASH

      // --------------------

      return res.redirect("https://auto-wash-psi.vercel.app/info");
    });

    python_process.stderr.on("data", (data) => {
      console.error(`exec error: ${data}`);
      res.status(500).send(`exec error: ${data}`);
    });
  } catch {
    return res.status(500).send("Error");
  }
};

export default paymentNotRegister;
