
import User from "../../model/userSchema.js"
import twilio from "twilio"
import dotenv from "dotenv"

import express from "express"
dotenv.config();
const app = express()
app.use(express.json());
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


       
const otpStore = {};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

const getOtp = async (req,res) => {
    try {
        // if(req.session.otpsend){
        //      res.render("otpVerfiy")
        // }else{
        //     res.redirect("/signup")
        // }
        return res.render("otpVerfiy")
        
    } catch (error) {
        console.error(`error due to otp rendring ${error}`)
    }
}

const otpVerify = async (req, res) => {
  try {
    console.log(`sbchsdbvcxhhudv`)
    const { phone } = req.body;
    console.log(phone)
    const otp = generateOTP();
    console.log(otp)
    otpStore[phone] = otp;
    console.log(process.env.TWILIO_PHONE_NUMBER)
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    res.status(500).json({ success: false, message: 'Server error occurred' });
  }
};

// ✅ Verify OTP
const VerifiedOtp = async (req, res) => {
  const { phone, otp } = req.body;
  if (otpStore[phone] === otp) {
    delete otpStore[phone]; // clear OTP after use
    res.json({ success: true, message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
};




// const otpVerify = async (req, res) => {
//   try {
//     // Check if session has user details
//     if (!req.session.UserDetails || !req.session.otpsend) {
//       return res.status(400).json({ success: false, message: "Session expired or invalid." });
//     }

//     let { phone } = req.body;

//     // Check if phone number already used (double-check)
//     const existingPhone = await User.findOne({ phone });
//     if (existingPhone) {
//       return res.status(409).json({ success: false, message: "Phone number already in use" });
//     }
//     if (phone.startsWith("+91")) {
//       phone = phone.slice(3);
//     }
//     // Save user from session
//     const userData = req.session.UserDetails;
//     userData.phone = phone; // update with verified phone
//     const newUser = new User(userData);
//     const savedUser = await newUser.save();

//     // Clear session
//     req.session.userId = savedUser._id;
//     req.session.UserDetails = null;
//     req.session.otpsend = false;
//     req.session.Islogged =true  

//     res.status(201).json({ success: true, message: "User registered & phone verified successfully ✅" });
//   } catch (error) {
//     console.error("OTP Verification Error:", error);
//     res.status(500).json({ success: false, message: "Server error during OTP verification" });
//   }
// };


export default {
    getOtp,
    otpVerify,
    VerifiedOtp
}