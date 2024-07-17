import { handleErrors } from './fetchHelper';

// get request to search for social media profiles
export const SocialMediaSearch = (name, callback) => {
  let query = `${name} site:facebook.com OR site:instagram.com`;
  fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_SEARCH_API_KEY}&cx=${
      process.env.GOOGLE_CSE_ID
    }&q=${encodeURIComponent(query)}`
  )
    .then(handleErrors)
    .then((response) => {
      return callback(response);
    });
};
