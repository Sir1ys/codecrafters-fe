import axios from "axios";

const BASE_URL = "https://codecrafters-9qyn.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchEvents = () => {
  return api.get("/events").then((response) => response.data);
};

export const attendEvent = (event_id, user_id) => {
  return api.post("/events_users/:user_id", {
    event_id: event_id,
    user_id: user_id,
  });
};
