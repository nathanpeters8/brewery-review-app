import { safeCredentials, safeCredentialsForm, handleErrors } from './fetchHelper';

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
export const UserSignUp = (formData, callback) => {
  fetch(
    '/api/users',
    safeCredentialsForm({
      method: 'POST',
      body: formData,
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
  ).then((response) => {
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

export const SubmitReview = (formData, callback) => {
  fetch(
    '/api/reviews',
    safeCredentialsForm({
      method: 'POST',
      body: formData,
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('Review submitted:', response);
      return callback(response);
    });
};

export const GetReviewsByBrewery = (breweryId, callback) => {
  fetch(
    `/api/${breweryId}/brewery_reviews`,
    safeCredentials({
      method: 'GET',
    })
  )
    .then(handleErrors)
    .then((response) => {
      // console.log('Reviews:', response);
      return callback(response.reviews);
    });
};

export const UploadImage = (formData, callback) => {
  fetch(
    '/api/images',
    safeCredentialsForm({
      method: 'POST',
      body: formData,
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('Image uploaded:', response);
      return callback(response);
    });
};

export const GetImagesByBrewery = (breweryId, callback) => {
  fetch(
    `/api/${breweryId}/brewery_images`,
    safeCredentials({
      method: 'GET',
    })
  )
    .then(handleErrors)
    .then((response) => {
      return callback(response.images);
    });
};

export const GetReviewsByUser = (userId, callback) => {
  fetch(
    `/api/${userId}/user_reviews`,
    safeCredentials({
      method: 'GET',
    })
  )
    .then(handleErrors)
    .then((response) => {
      return callback(response.reviews);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export const GetImagesByUser = (userId, callback) => {
  fetch(
    `/api/${userId}/user_images`,
    safeCredentials({
      method: 'GET',
    })
  )
    .then(handleErrors)
    .then((response) => {
      return callback(response.images);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export const DeleteReview = (reviewId, callback) => {
  fetch(
    `/api/reviews/${reviewId}`,
    safeCredentials({
      method: 'DELETE',
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('Review deleted:', response);
      return callback(response);
    });
};

export const DeleteImage = (imageId, callback) => {
  fetch(
    `/api/images/${imageId}`,
    safeCredentials({
      method: 'DELETE',
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('Image deleted:', response);
      return callback(response);
    });
};

export const GetProfile = (userId, callback) => {
  fetch(
    `/api/users/${userId}`,
    safeCredentials({
      method: 'GET',
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('Profile:', response);
      return callback(response.user);
    });
};

export const EditProfile = (formData, userId, callback) => {
  // console.log('Sending update with info:', info);
  fetch(
    `/api/users/${userId}`,
    safeCredentialsForm({
      method: 'PATCH',
      body: formData,
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('Profile updated: ', response);
      return callback(response);
    });
};

export const DeleteUser = (userId, callback) => {
  fetch(
    `/api/users/${userId}`,
    safeCredentials({
      method: 'DELETE',
    })
  )
    .then(handleErrors)
    .then((response) => {
      console.log('User deleted:', response);
      return callback(response);
    });
};

// City and State Search API
export const GetCitySuggestions = (query, state, callback) => {
  fetch(
    `https://city-and-state-search-api.p.rapidapi.com/cities/search?q=${encodeURIComponent(query)}&country_code=US${
      state !== '' ? `&state_name=${state}` : ''
    }`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
        'x-rapidapi-host': 'city-and-state-search-api.p.rapidapi.com',
      },
    }
  )
  .then(handleErrors)
  .then((response) => {
    // console.log(response);
    return callback(response);
  });
};
