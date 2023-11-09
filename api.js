import axios from "axios";

const BASE_URL = "https://codecrafters-9qyn.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchEvents = () => {
  return api.get("/events").then((response) => response.data);
};

export const fetchEventById = (event_id) => {
  return api.get(`/events/${event_id}`).then((response) => response.data);
};
