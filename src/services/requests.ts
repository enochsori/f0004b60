import axios from 'axios';
import { Activity } from './types';

const baseUrl = import.meta.env.VITE_BASE_URL;

// get all activities
export const getActivities = async (): Promise<Activity[]> => {
  const res = await axios.get(`${baseUrl}/activities`);
  return res.data;
};

// get a call detail by call_id
export const getCallDetail = async (call_id: string): Promise<Activity> => {
  const res = await axios.get(`${baseUrl}/activities/${call_id}`);
  return res.data;
};

// patch a call into archive with call_id
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
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// patch all calls into archive with call_ids
export const patchArchiveAllCalls = async (call_ids: string[]) => {
  const patchRequests = call_ids?.map((call_id) => patchArchiveCall(call_id));

  try {
    await Promise.all(patchRequests);
  } catch (error) {
    console.error('Error in patch requests', error);
  }
};

export const patchResetAllCalls = async () => {
  try {
    const res = await axios.patch(`${baseUrl}/reset`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
