import axios from "axios";

const BASE_URL = "https://codecrafters-9qyn.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchEvents = () => {
  return api.get("/events").then((response) => response.data);
};

export const attendEvent = (event_id, user_id) => {
  return api.post(`/users/${user_id}/my-events/${event_id}`);
};
