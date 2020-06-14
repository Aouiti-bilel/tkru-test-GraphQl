const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers')
const schemaDirectives =require('./DirectiveAuth')
const server = new ApolloServer({ 
     typeDefs,
     resolvers,
     schemaDirectives,
     context: ( {req, res} ) =>({ req, res})
     // # 
     // {
       //  let decoded =null
        //  const token = req.headers.authorization
        //  if(token){
        //     decoded = jwt.verify(token, jwtSecret);
       //   }
        
         // if(decoded){
         //     req.user = decoded.user
        //  } else{ req.user = ''}
        //  return req, res
       // } 
 });

server.listen().then(({ url } ) => console.log( `servet Lisning On ${url}`))