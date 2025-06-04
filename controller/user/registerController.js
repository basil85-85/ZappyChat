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
    const { firstName, lastName, username, password, phone } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Username already exists' });
    }

    const existingPhoneNumber = phone && await User.findOne({ phone });
    if (existingPhoneNumber) {
      return res.status(409).json({ success: false, message: 'Phone number already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      username,
      phone: phone || null,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });

  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export default {
  getRegister,
  register,
};
