import { safeCredentials, safeCredentialsFormData, handleErrors } from './fetchHelper';

export const GetBreweries = (query, callback) => {
  let params = '';
  if (query.hasOwnProperty('name')) params += `by_name=${query.name}&`;
  if (query.hasOwnProperty('city')) params += `by_city=${query.city}&`;
  if (query.hasOwnProperty('state')) params += `by_state=${query.state}&`;
  if (query.hasOwnProperty('postal')) params += `by_postal=${query.postal}&`;

  if(params.endsWith("&")) params = params.slice(0, -1);

  fetch(`https://api.openbrewerydb.org/v1/breweries?${params}`)
    .then(handleErrors)
    .then((response) => {
      return callback(response);
    });
};

export const GetBreweriesById = (id, callback) => {
  fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`)
    .then(handleErrors)
    .then((response) => {
      return callback(response);
    });
};
