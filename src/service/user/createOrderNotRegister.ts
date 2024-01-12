import OrderPayment from "../../db/SchemaOrderNotRegister";

const createOrderNotRegister = async (req, res) => {
  const { orderId, washId, washNumberPost, titleWash, addressWash } = req.body;

  console.log(req.body);

  if (!orderId) {
    return res.status(400).send("Not enough arguments");
  }

  try {
    await OrderPayment.create({
      orderId: orderId,
      washId: washId,
      washNumberPost: washNumberPost,
      titleWash: titleWash,
      addressWash: addressWash,
      status: "wait",
    });

    return res.status(201).send("Create");
  } catch (err) {
    return res.status(500);
  }
};

export default createOrderNotRegister;
