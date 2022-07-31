import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      'x-rapidapi-host': 'bayut.p.rapidapi.com',
      'x-rapidapi-key': '0e0844eb38msh9ec4489f39572a5p1389a9jsnb6c8fdfcb63e',
    },
  });

  return data;
};
