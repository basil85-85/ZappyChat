const getErrorpage = async (req,res) => {
    try {
        res.render("404")
    } catch (error) {
        console.log(`error due to rendering the error page of : ${error}`)
    }
} 

export default {getErrorpage}