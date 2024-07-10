import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getActivities = async () => {
  const res = await axios.get(`${baseUrl}/activities`);
  console.log(res.data);
  return res.data;
};
