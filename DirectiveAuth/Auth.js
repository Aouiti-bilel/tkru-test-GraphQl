const { SchemaDirectiveVisitor }= require('apollo-server');
const { defaultFieldResolver } =require('graphql')
const verifAuthToken= require('./verifAuthToken')
class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field){
    const { resolve= defaultFieldResolver } = field
    
    field.resolve = function(...args){
        const [ , ,context ] = args
      
       verifAuthToken(context.req)
       return resolve.apply(this, args)
    }
  }
}
module.exports =AuthDirective