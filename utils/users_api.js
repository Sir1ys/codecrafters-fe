import axios from "axios";

const usersAPI = axios.create({
  baseURL: "https://codecrafters-9qyn.onrender.com/api/users",
});

export const getUserById = (userId) => {
  return usersAPI.get(`/${userId}`).then((response) => {
    return response.data.user;
  });
};

export const createUser = (user) => {
  return usersAPI.post(`/`, user).then((response) => {
    return response.data.user;
  });
};

export const updateUser = (userId, userDetails) => {
  return usersAPI.patch(`/${userId}`, userDetails).then((response) => {
    return response.data.user;
  });
};
