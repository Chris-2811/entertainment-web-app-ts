import { BASE_URL, API_KEY } from '@/constants';

const baseUrl = BASE_URL;
const apiKey = API_KEY;

export const fetchAPIData = async (endpoint: string) => {
  const response = await fetch(`${baseUrl}/${endpoint}?api_key=${apiKey}`);

  const data = await response.json();

  return data.results;
};
