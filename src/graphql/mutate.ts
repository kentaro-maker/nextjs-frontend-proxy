import { gql } from "@apollo/client";

export const REGISTER_MUTATE = gql`
mutation($name: String!, $email: String!, $password: String!, $passwordConfirm: String!){
  register(input:{name:$name, email:$email, password:$password,  password_confirmation:$passwordConfirm}) {
    me {
      name
      email
    }
    token
    message
  }
}
`;


export const LOGIN_MUTATE = gql`
    mutation($email: String!, $password: String!){
        login(input:{email:$email, password:$password}){
            me {
                name
                email
            }
            token
            message
        }
    }
`;

export const LOGOUT_MUTATE = gql`
    mutation {
        logout {
            message
        }
    }
`;

export const POST_MUTATE = gql`
    mutation($email: String!, $password: String!){
        login(input:{email:$email, password:$password}){
            me {
                name
                email
            }
            token
            message
        }
    }
`;