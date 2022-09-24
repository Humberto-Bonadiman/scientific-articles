import { bodyInterface } from '../interfaces/fetchInterfaces';

const api = 'https://core.ac.uk:443/api-v2/articles/search';
const queryParams = '?metadata=true&fulltext=false&citations=false&similar=false&duplicate=false&urls=true&faithfulMetadata=false';
const apiKey = `&apiKey=${process.env.API_KEY}`;
const appJson = 'application/json';

export const fetchApi = async (body: bodyInterface[]) => {
  const fetchPostArticlesSearch = fetch(`${api}${queryParams}&${apiKey}`, {
    method: 'POST',
    headers: {
      Accept: appJson,
      'Content-Type': appJson,
    },
    body: JSON.stringify(body),
  });
  const response = await fetchPostArticlesSearch;
  return response;
};
