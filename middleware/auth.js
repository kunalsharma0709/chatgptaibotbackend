const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET;
function authMiddleware(req,res,next){
    
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.json({
            msg:"there is no token or the token is wrong"
        })
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token,JWT_SECRET)
    
    req.userId = decoded.idd
    
    next()
     
}

module.exports={authMiddleware}

