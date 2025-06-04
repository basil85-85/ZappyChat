const homePage = async (req,res) => {
    try {
        return res.render("home")
    } catch (error) {
        return res.redirect("/")
    }
}

export default {homePage}