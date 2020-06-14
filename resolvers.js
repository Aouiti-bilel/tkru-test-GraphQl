const User = require('./UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const validation  = require('./validation')
const  Joi= require ('joi')
module.exports = {
    Query: {
        me: async(root, args, { req }, info) => {
            //auth(req.user); @auth

            return await User.findOne({ where: { id: req.user.id }})
            
            },
        users: (root, args, ctx, info) => {
             return  User.findAll()
            }
    },
    Mutation: {
        signUp: async (root, args, ctx, info) => {
            await Joi.validate(args, validation, { abortEarly: false })
            let userExist = await User.findOne({ where: {name:args.name} })  
                 args.last_login = Date.now()         
            if(userExist){
                throw new Error( 'User Already Exists');
            }
             const user = await User.create(args)
             
             
             return user
        },
        signIn: async (root, { name , password }, ctx, info) => {
            
            let user = await  User.findOne({ where: { name } });
            if(!user){
                throw new Error('Invalid Name')
            }
            const isMatch = bcrypt.compare(password, user.password)
            if(!isMatch){
                throw new Error('Invalid Passsord')
            }
            const payload = {
                user: {
                    id: user.id
                }
            }
            await User.update(
                {
                    last_login:  Date.now()
                 },
                 { where: {id: user.id} }
                 
                 )  
           const token= jwt.sign(payload, config.get('jwtSecret'))
           return  { user, token }

        },
        deleteUser: async(root, { id }, ctx, info)=>{
            let rowDeleted  = await User.destroy({ where: {id: id} })
            try {
                if(!rowDeleted){
                 return 'We Can not  Delete This User'
                } 
     
                return 'User Deleted successfully'
             } catch (err) {
                 
                 throw new Error('Internal Server Error ')
             }
        },
        editUser: async(root, { name,famiy_name, id }, ctx, info)=>{    
            let verifyName = await User.findOne({ where: {name: name} })

                if(verifyName){
                    throw new Error('This Name Already Exist') 
                }
                let updatedUser = await User.update(
                 {
                    name: name,
                    famiy_name: famiy_name,
                  },
                  { where: {id: id} }
                  
                  )
                
                if(!updatedUser[0]){
                    throw new Error(`we can not update ${name} information`) 
                }
                let user = await User.findOne({ where: {id: id}})
                return user
                

        }
    }
}