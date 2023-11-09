import axios from "axios";

const usersAPI = axios.create({
  baseURL: "https://codecrafters-9qyn.onrender.com/api/users",
});

export const createUser = (user) => {
  return usersAPI.post(`/`, user).then((response) => {
    return response.user;
  });
};
