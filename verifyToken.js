
const jwt = require('jsonwebtoken')
require('dotenv').config();

const auth = (req,res,next) =>{
    const token = req.cookies.jwtoken;
    if(token) {
        
        jwt.verify(token , process.env.ACCESS_TOKEN_SECRET ,(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/login')
            }else{
                // console.log(decodedToken);
                next();
            }
        })
    }else{
        res.status(401).send('Access Denied');
     
    }
}

module.exports = {auth}

