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

export const getUserInterests = (userId) => {
  return usersAPI.get(`/${userId}/interests`).then((response) => {
    return response.data.userInterests;
  });
};

export const removeUserInterest = (userId, interestId) => {
  return usersAPI
    .delete(`/${userId}/interests/${interestId}`)
    .then((response) => {
      return response;
    });
};

export const addUserInterest = (userId, interestId) => {
  return usersAPI
    .post(`/${userId}/interests/`, { interest_id: interestId })
    .then((response) => {
      return response.data;
    });
};

export const getUserTrips = (userId) => {
  return usersAPI
    .get(`/${userId}/trips`)
    .then((response) => response.data.trips);
};
