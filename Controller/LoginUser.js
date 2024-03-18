import { generateJwtToken } from "../Config/GenerateJwtTokens.js";
import User from "../Model/User.js";
import bcrypt from "bcrypt";
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const foundUser = await User.findOne({ email: email }).select({
        password: 1,
      });
      if (foundUser?.password) {
        const varifyPassword = await bcrypt.compare(
          password,
          foundUser.password
        );

        if (varifyPassword) {
          const jwt = await generateJwtToken(foundUser._id);
          const user = await User.findOne({ email: email }, { password: 0 });
          res.status(200).json({ token: jwt, user: user });
        } else {
          res.status(400).json({ message: "Password doesn't match!" });
        }
      } else {
        res.status(400).json({ message: "Email or password is not correct!" });
      }
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
export { loginUser };
