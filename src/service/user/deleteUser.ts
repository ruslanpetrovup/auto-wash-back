import User from "../../db/SchemaUser";

const deleteUser = async (req: any, res: any) => {
  const { idUser } = req.body;

  if (!idUser) return res.status(400).send("Not enough arguments");

  try {
    const user = await User.findOne({ idUser: idUser });

    if (!user) return res.status(404);

    const updateUser = await User.findByIdAndDelete(user._id);

    return res.status(201).send(updateUser);
  } catch (err) {
    console.log(err);

    return res.send(500);
  }
};

export default deleteUser;
