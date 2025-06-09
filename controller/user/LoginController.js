import User from '../../model/userSchema.js';
import bcrypt from 'bcrypt';

const GetloginPage = async (req, res) => {
  try {
    res.render('login');
  } catch (error) {
    console.error(`error on the rendering the login page due to : ${error}`);
  }
};

const Getlogined = async (req, res) => {
  try {
    console.log(req.body);
    const { usernamephone, password } = req.body;

    // Validation
    if (!usernamephone || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required' });
    }

    // Find user by username or phone
    const user = await User.findOne({
      $or: [{ username: usernamephone }, { phone: usernamephone }],
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'User not found' });
    }
    
    // Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Incorrect password' });
    }

    // Set session
    req.session.Islogged = true;
    req.session.userId = user._id;

    console.log('User session set:', user._id);

    return res.status(200).json({
      success: true,
      message: 'User logged in successfully',
    });
  } catch (error) {
    console.error('Login error:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Server error, try again later' });
  }
};

export default {
  GetloginPage,
  Getlogined,
};
