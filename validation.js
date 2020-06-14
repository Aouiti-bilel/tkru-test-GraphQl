const  Joi= require ('joi')
Valid = Joi.object().keys({
    famiy_name: Joi.string().alphanum().min(4).max(30).required().label('famiy_name') ,
    name: Joi.string().alphanum().max(300).required().label('name'),
    password: Joi.string().min(4).max(300).required().label('password')
  
   })
module.exports =  Valid