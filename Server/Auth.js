const jwt = require('jsonwebtoken');
const user = require('./data');

const Authenticate = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        const verifyToken = jwt.verify( token, process.env.SECRET_KEY );
        const rootUser = await user.findOne({_id: verifyToken._id, "jwtokens.token": token});
        
        if(!rootUser){
            return res.send("User not found")
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();
    }catch(e){
        res.status(401).send("Unauthorized token not found");
        console.log(e);
    }
}

module.exports = Authenticate;
