const GetloginPage =async(req,res)=>{
    try {
        res.render("login")
    } catch (error) {
        console.error(`error on the rendering the login page due to : ${error}`)
    }
}

export default {
    GetloginPage ,
}