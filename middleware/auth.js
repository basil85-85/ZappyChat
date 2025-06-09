const authMiddleware = (req, res, next) => {
  if (req.session && req.session.Islogged && req.session.userId) {
    next(); // Authenticated
  } else {
    res.status(401).json({ success: false, message: "Unauthorized. Please login." });
  }
};


export default {authMiddleware}                   