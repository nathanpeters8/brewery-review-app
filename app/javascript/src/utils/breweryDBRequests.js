import { safeCredentials, safeCredentialsFormData, handleErrors } from './fetchHelper';

export const GetBreweriesByName = (name, callback) => {
  fetch(`https://api.openbrewerydb.org/v1/breweries?by_name=${name}`)
    .then(handleErrors)
    .then((response) => {
      return callback(response);
    })
}