import axios from 'axios'
import { GraphQLClient } from 'graphql-request'
const graphQLClient = new GraphQLClient("http://localhost:4000/graphql", {
    headers: {
      authorization:localStorage.getItem('token'),
      credentials: 'include',
      mode: 'cors',
    }

  })
//Register New User 
export const register =({name, pass, famiy_name}, history) => async dispatch => {
    if(history){
        history.push('/login')
    }

     
      const Query = /* GraphQL */ `
        mutation{
                signUp(name:"${name}", password:"${pass}", famiy_name:"${famiy_name}"){
                
                      id
                      name
                      last_login
                      createdAt
                      famiy_name
           
                }
        }
      `
    try {
        const data = await graphQLClient.request(Query)
         dispatch({
             type: "REGISTER_SUCCESS",
             payload: data.signUp
         });
         if(data.error){
             console.log(data.error)
         }

    } catch (err) {
   
        console.log(err)
        
    }
}
// Login User  
export const login = ({name, pass}) => async dispatch => {
    const Query = /* GraphQL */ `
    mutation{
        signIn(name:"${name}", password:"${pass}"){
        user{name}
          token
        }
        
      }
  `
    try {
        const data = await graphQLClient.request(Query)
       
        dispatch({
          type : "LOGIN_SUCCESS",
          payload: data.signIn
  });
 
 
    } catch (err) {
        console.log(err)
    }

}

// Logout 
  export const logout = () => dispatch => {
    dispatch({ type: 'LOGOUT' });
  };

  // Load User (Get Current User)
export const loadUser = () => async dispatch => {
    const Query = /* GraphQL */ `
    {
        me{
            id
           name,
           famiy_name
           last_login
           createdAt
        }
        
      }
  `
    try {
        const data = await graphQLClient.request(Query)     
        dispatch({
            type: "CURRENT_USER",
            payload: data.me
        });

    } catch (err) {

    }
}
export const getUsers = () => async dispatch => {
    const Query = /* GraphQL */ `
    {
        users{
            id
           name
           famiy_name
           last_login
           createdAt
        }  
      }
  `
    try {
        const data = await graphQLClient.request(Query)
        dispatch({
            type: "GET_USERS",
            payload: data.users
        });
    } catch (err) {
       
        console.log(err)
    }
}
// Delete User
export const deleteUser = (id) => async dispatch => {
    const Query = /* GraphQL */ `
    mutation {
         
            deleteUser(id:"${id}")
            
      }
  `
    try {
         await graphQLClient.request(Query)
        dispatch({
            type: "DELETE_USER",
            payload: id
        });
    } catch (err) {
    console.log(err)
}}
// Update User
export const updateUser = ({ id, name, famiy_name}) => async dispatch => {
    console.log(id)
    const Query = /* GraphQL */ `
    mutation { 
        editUser(id:"${id}",name: "${name}", famiy_name: "${famiy_name}"){id,name,famiy_name,updateAt,last_login}
        }
  `
    try {
        const data = await graphQLClient.request(Query)
        dispatch({
            type: "UPDATE_USER",
            payload: data.editUser
        });
    } catch (err) {
        console.log(err)
}};


export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
  const id = Date.now()
  dispatch({
    type: 'SET_ALERT',
    payload: { msg, alertType, id }
  });
  setTimeout(() => dispatch({ type: 'REMOVE_ALERT', payload: id }), timeout);
};