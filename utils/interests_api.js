import axios from "axios";

const interestsAPI = axios.create({
  baseURL: "https://codecrafters-9qyn.onrender.com/api/interests",
});

export const getAllInterests = () => {
  return interestsAPI.get(`/`).then((response) => {
    return response.data.interests;
  });
};
