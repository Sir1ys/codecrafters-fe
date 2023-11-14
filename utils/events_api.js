import axios from "axios";

const eventsAPI = axios.create({
  baseURL: "https://codecrafters-9qyn.onrender.com/api/events",
});

export const postEvent = (event) => {
  return eventsAPI.post("/", { event }).then((response) => {
    return response.data.event;
  });
};

const info = {
  event: {
    event_id: 21,
    creator_id: "1",
    date: "2021-12-12T00:00:00.000Z",
    short_description: "Test event",
    description: "Test event description",
    location: "Test location",
    latitude: 1.834,
    longitude: 41.595,
    event_picture: "https://www.google.com/test.png",
  },
};
