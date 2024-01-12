import User from "../../db/SchemaUser";
const changeEmail = async (req: any, res: any) => {
  const { idUser, email } = req.body;

  if (!idUser || !email) return res.status(400).send("Not enough arguments");

  try {
    const user = await User.findOne({ idUser: idUser });
    console.log(user);

    if (!user) return res.status(404);

    const updateUser = await User.findByIdAndUpdate(user._id, {
      email: email,
    });

    return res.send(updateUser);
  } catch (err) {
    console.log(err);
    res.send(500);
  }
};

export default changeEmail;
