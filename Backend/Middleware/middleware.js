const jwt = require("jsonwebtoken");
const S_KEY = "password"; 

const userTokenVerification = (req, res, next) => {
    if (req.body.token) {
        try {
         
            const decoded = jwt.verify(req.body.token, S_KEY);
            req.user = decoded; 
            next();
        } catch (error) {
            res.status(404).send({ message: "Invalid Token", error: error });
        }
    } else {
        res.status(404).send({ message: "Token not provided" });
    }
};

module.exports = { userTokenVerification };
