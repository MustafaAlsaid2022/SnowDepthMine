const joi = require('joi')

const loginValidation = (a)=> {

    const schema = joi.object({ 
        email: joi.string() .min(6) .required() .email(),
        password: joi.string() .min(6) .required() });
        
        const validation = schema.validate(a);
        return validation
}

module.exports = {loginValidation}