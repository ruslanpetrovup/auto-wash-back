import payload from "payload";
import OrderPayment from "../../db/SchemaOrder";
import User from "../../db/SchemaUser";
const { spawn } = require("child_process");

const returnDate = () => {
  const date = new Date();
  const formattedDate = date.toISOString();
  console.log(formattedDate);

  return formattedDate;
};

const payment = async (req, res) => {
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

      const user = await User.findOne({ phone: orderPayment.number });

      const checkWashBalance = user.balanceWash.find(
        (item) => item.id === orderPayment.washId
      );

      console.log(total);

      if (total.status === "error") {
        await OrderPayment.findByIdAndUpdate(orderPayment._id, {
          status: "error",
        });

        return res.redirect("https://auto-wash-psi.vercel.app/info");
      }

      if (checkWashBalance === undefined) {
        await User.findByIdAndUpdate(user._id, {
          balanceWash: [
            ...user.balanceWash,
            {
              id: orderPayment.washId,
              address: orderPayment.addressWash,
              balance: String(total.amount),
            },
          ],
          historyPayment: [
            ...user.historyPayment,
            {
              title: orderPayment.titleWash,
              address: orderPayment.addressWash,
              balance: String(total.amount),
              date: `${day}.${month}.${year}`,
            },
          ],
        });
      } else {
        await User.findByIdAndUpdate(user._id, {
          balanceWash: [
            ...user.balanceWash.filter(({ id }) => id !== checkWashBalance.id),
            {
              ...checkWashBalance,
              balance: String(Number(checkWashBalance.balance) + total.amount),
            },
          ],
          historyPayment: [
            ...user.historyPayment,
            {
              title: orderPayment.titleWash,
              address: orderPayment.addressWash,
              balance: String(total.amount),
              date: `${day}.${month}.${year}`,
            },
          ],
        });
      }

      await payload.create({
        collection: "payments",
        data: {
          number: user.phone,
          sum: total.amount,
        },
      });

      await payload.create({
        collection: "log-payment",
        data: {
          phone: user.phone,
          amount: total.amount,
          date: returnDate(),
        },
      });
      console.log(user.phone);

      await OrderPayment.findByIdAndUpdate(orderPayment._id, {
        status: "success",
      });

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

export default payment;
