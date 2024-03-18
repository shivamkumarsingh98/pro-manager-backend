import { generateJwtToken } from "../Config/GenerateJwtTokens.js";
import User from "../Model/User.js";
import bcrypt from "bcrypt";
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const count = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, count);

    if (name && email && password) {
      const createUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      await createUser.save();
      const jwt = await generateJwtToken(createUser._id);
      const newUser = await User.findById(createUser._id).select({
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      });
      res.status(201).json({ token: jwt, user: newUser });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
export { registerUser };
