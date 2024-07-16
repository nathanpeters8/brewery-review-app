import { safeCredentials, safeCredentialsFormData, handleErrors } from './fetchHelper';

// get request to check if user is authenticated
export const Authenticate = (callback) => {
  fetch(
    '/api/authenticated',
    safeCredentials({
      method: 'GET',
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('Authenticated:', response.authenticated);
      return callback(response);
    });
};

// post request to sign up a user
export const UserSignUp = (username, email, password, city, state, callback) => {
  fetch(
    '/api/users',
    safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
          city: city,
          state: state
        },
      }),
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('Sign up:', response);
      return callback(response);
    });
};

// post request to log in a user
export const UserLogIn = (email, password, callback) => {
  fetch(
    '/api/sessions',
    safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('Log in:', response);
      return callback(response);
    });
};

// delete request to sign out a user
export const UserSignOut = (callback) => {
  fetch(
    '/api/logout',
    safeCredentials({
      method: 'DELETE',
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('User signed out:', response);
      return callback(response);
    });
};
