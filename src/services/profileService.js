import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // backend url

export const createOrUpdateProfile = async (profileData) => {
  const res = await axios.post(`${API_URL}/profile`, profileData);
  return res.data;
};

export const getProfileByEmail = async (email) => {
  const res = await axios.get(`${API_URL}/profile/${email}`);
  return res.data;
};
