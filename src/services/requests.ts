import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

// get all activities
export const getActivities = async () => {
  const res = await axios.get(`${baseUrl}/activities`);
  return res.data;
};
