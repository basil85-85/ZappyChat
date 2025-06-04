
import User from "../../model/userSchema.js"

const getOtp = async (req,res) => {
    try {
        if(req.session.otpsend){
             res.render("verification")
        }else{
            res.redirect("/signup")
        }
        
    } catch (error) {
        console.error(`error due to otp rendring ${error}`)
    }
}

const otpVerify = async (req, res) => {
  try {
    // Check if session has user details
    if (!req.session.UserDetails || !req.session.otpsend) {
      return res.status(400).json({ success: false, message: "Session expired or invalid." });
    }

    const { phone } = req.body;

    // Check if phone number already used (double-check)
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(409).json({ success: false, message: "Phone number already in use" });
    }

    // Save user from session
    const userData = req.session.UserDetails;
    userData.phone = phone; // update with verified phone
    const newUser = new User(userData);
    const savedUser = await newUser.save();

    // Clear session
    req.session.userId = savedUser._id;
    req.session.UserDetails = null;
    req.session.otpsend = false;
    req.session.Islogged =true  

    res.status(201).json({ success: true, message: "User registered & phone verified successfully ✅" });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ success: false, message: "Server error during OTP verification" });
  }
};


export default {
    getOtp,
    otpVerify
}