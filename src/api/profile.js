// src/api/profile.js
import axios from 'axios';

export const saveProfileData = async (profileData) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/profile/update`, profileData);
  return response.data;
};
