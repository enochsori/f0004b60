import axios from 'axios';
import { useLocation } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_BASE_URL;

// get all activities
export const getActivities = async () => {
  const res = await axios.get(`${baseUrl}/activities`);
  console.log('all activities', res.data);
  return res.data;
};

// get a call detail by call_id
export const getCallDetail = async (call_id: string) => {
  const res = await axios.get(`${baseUrl}/activities/${call_id}`);
  console.log('call detail', res.data);
  return res.data;
};

// patch to archive a call with call_id
export const patchArchiveCall = async (call_id: string) => {
  const updatedField = { is_archived: true };
  try {
    const res = await axios.patch(
      `${baseUrl}/activities/${call_id}`,
      updatedField,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Response:', res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const patchArchiveAllCalls = (...call_id: string[]) => {};

export const patchResetAllCalls = async () => {
  console.log('called to reset all calls');
  try {
    const res = await axios.patch(`${baseUrl}/reset`);
    console.log('response', res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
