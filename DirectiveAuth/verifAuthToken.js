const jwt =require('jsonwebtoken')
const  { UserInputError, AuthenticationError } =require('apollo-server')
const config = require('config');
module.exports =  function(req){
    // Get Token From Header
    const token = req.headers.authorization;
    // Check If Not Token 
    if(!token){
        throw new Error('NO Token, Authorization Denied !')
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user
       return  decoded.user
       
    } catch (error) {
        throw new AuthenticationError('Login Failed')
    }
};