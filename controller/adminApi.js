require('dotenv').config();
const password = process.env.PASSWORD;
const email = process.env.EMAIL;
const { loginValidation } = require('../validation')
const jwt =require('jsonwebtoken');



const admins = [
    {

        name: "admin",
        email: email,
        password: password
    }
]

const logIn = async (req, res) => {
    // console.log(req.body)
    const { error } = loginValidation(req.body)
    if (error) return res.send({ message: error.details[0].message });
    const myEmail = req.body.email;
    const myPassword = req.body.password;
    console.log('xxxx')

    const user = await admins.find(user => user.email === myEmail)
    // console.log(user)

    if (user) {
        try {
            //
            if (myPassword === user.password) {
                

                const maxAge = 3 * 24 * 60 * 60;
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                res.status(202).cookie('jwtoken', accessToken, {
                    path: '/',
                    sameSite: 'strict',
                    httpOnly: true,
                    maxAge: maxAge * 1000,

                });

                // console.log(accessToken)
                res.send({ message: "cookie has bee initialised" })
                

            }

            else res.send({ message: "The password is invalid or the user does not have a password" })

        } catch {
            res.status(500).send()
        }
    } else {
        res.status(201).send({ message: "There is no user record corresponding to this identifier. The user may have been deleted" })
    }

}


const logOut = async (req,res)=>{
   // res.status(202).clearCookie('jwtoken');
    //res.send({message:"cookie has bee initialised"})
    res.status(202).clearCookie('jwtoken' );
    res.sendStatus(200);
 
    //res.cookie('jwtoken' ,'', {maxAge:1 });
   // res.redirect('/'),
   //res.send('okkkkkkkkkkkkkkkkkkkk')
   //console.log('esaaadfg')

 }


module.exports = { logIn, logOut }
