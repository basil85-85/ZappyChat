import User from '../../model/userSchema.js';
import bcrypt from 'bcrypt';

const getRegister = async (req, res) => {
  try {
    res.render('register');
  } catch (error) {
    console.error(`error due to rendering the register due to : ${error}`);
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body)
    const { firstName, lastName, username, phone, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(404)
        .json({ success: false, message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      username,
      phone,
      password: hashedPassword, // Save hashed password
    });
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(`due to : ${error}`);
  }
};

export default {
  getRegister,
  register,
};
