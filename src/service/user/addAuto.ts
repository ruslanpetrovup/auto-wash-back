import User from "../../db/SchemaUser";
const addAuto = async (req: any, res: any) => {
  const { idUser, auto } = req.body;

  if (!idUser || !auto) return res.status(400).send("Not enough arguments");

  try {
    const user = await User.findOne({ idUser: idUser });

    if (!user) return res.status(404);
    if (user.numbersCar.includes(auto))
      return res.status(409).send("there is such");

    const updateUser = await User.findByIdAndUpdate(user._id, {
      numbersCar: [...user.numbersCar, auto],
    });

    return res.status(201).send(updateUser);
  } catch (err) {
    console.log(err);

    return res.send(500);
  }
};

export default addAuto;
