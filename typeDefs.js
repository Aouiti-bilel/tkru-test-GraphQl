const { gql }  = require('apollo-server');


module.exports = gql`
directive @auth on FIELD_DEFINITION
type User {
    id: ID
    name: String
    password: String
    famiy_name: String
    last_login: String
    createdAt: String
    updateAt: String
}
type Query {
    me: User!   @auth
    user(name: String!, password: String!): User! @auth
    users: [User!]!  
}
type Mutation {
    signUp(name: String, famiy_name: String,  password: String!): User
    signIn(name: String, password: String!): UsetInputType
    editUser(name: String,id: String! famiy_name: String!): User @auth
    deleteUser(id: String!): String!
  
    }
   type UsetInputType {
    user: User
    token: String
  }

`