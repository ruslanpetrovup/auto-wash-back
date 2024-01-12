import OrderPayment from "../../db/SchemaOrder";

const createOrderPayment = async (req, res) => {
  const { orderId, number, washId, titleWash, addressWash } = req.body;

  if (!orderId || !number) {
    return res.status(400).send("Not enough arguments");
  }

  try {
    await OrderPayment.create({
      orderId: orderId,
      washId: washId,
      titleWash: titleWash,
      addressWash: addressWash,
      number: number,
      status: "wait",
    });

    return res.status(201).send("Create");
  } catch (err) {
    return res.status(500);
  }
};

export default createOrderPayment;
