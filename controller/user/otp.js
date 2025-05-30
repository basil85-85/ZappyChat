


const getOtp = async (req,res) => {
    try {
        res.render("verification")
    } catch (error) {
        console.error(`error due to otp rendring ${error}`)
    }
}


export default {
    getOtp
}