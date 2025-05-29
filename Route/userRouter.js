import express from "express"
import loginController from "../controller/user/LoginController.js"
const route = express.Router()


route.get("/",loginController.GetloginPage)


export default route