import express from "express"
import loginController from "../controller/user/LoginController.js"
import registerController from "../controller/user/registerController.js"
import otpVerfication  from "../controller/user/otp.js"
import errorPage from "../controller/user/404.js"
import homeController from "../controller/user/homeController.js"

const route = express.Router()

// 404
route.get("/pageNotfound",errorPage.getErrorpage)

route.get("/",loginController.GetloginPage)

// sign up controller
route.get("/signup",registerController.getRegister)
route.post("/signup",registerController.register)

//otp verification 
route.get("/otp-verification",otpVerfication.getOtp)
route.post("/save-user",otpVerfication.otpVerify)

//rendering home page
route.get("/home",homeController.homePage)


export default route 