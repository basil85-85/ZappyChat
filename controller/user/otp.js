


const getOtp = async (req,res) => {
    try {
        res.render("verification")
    } catch (error) {
        console.error(`error due to otp rendring ${error}`)
    }
}

const otpVerify = async (req,res) => {
    try {
        console.log(req.body)
        return res.status(200).json({ sucess:true ,message: "User saved successfully ✅" });
    } catch (error) {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}    

export default {
    getOtp,
    otpVerify
}