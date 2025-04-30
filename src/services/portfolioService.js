import axios from 'axios';

const API_URL = 'http://localhost:5000/api/portfolio';

export const uploadProject = async (formData) => {
  const res = await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const getMyProjects = async (email) => {
  const res = await axios.get(`${API_URL}/${email}`);
  return res.data;
};
