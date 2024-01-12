import User from "../../db/SchemaUser";
import jwt from "jsonwebtoken";

const verify = async (req: any, res: any) => {
  const { token } = req.body;

  if (!token) return res.status(400).send("Not enough arguments");

  try {
    const { phone } = await jwt.verify(token, process.env.TOKEN_KEY);

    const user = await User.findOne({ phone: phone });

    if (!user) return res.json({ status: 404, message: "notFound" });

    return res.json({ status: 200, data: user });
  } catch (err) {
    console.log(err);
    return res.json({ status: 500, message: "invalid token" });
  }
};

export default verify;
