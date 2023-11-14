import axios from "axios";

const BASE_URL = "https://codecrafters-9qyn.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchEvents = () => {
  return api.get("/events").then((response) => response.data);
};

export const attendEvent = (event_id, user_id) => {
  return api.post(`/users/${user_id}/attending-events/${event_id}`);
};

export const saveEvent = (event_id, user_id) => {
  return api.post(`users/${user_id}/events-saved/${event_id}`);
}

export const fetchAttending = (user_id) => {
  return api
    .get(`/users/${user_id}/attending-events`)
    .then((response) => {
      return response.data;
    })
    .then((data) => {
   return data.events
    });
};

export const fetchSavedEvents = (user_id) => {
  return api.get(`/users/${user_id}/events-saved`)
}

export const postTrip = (
  creator_id,
  start_date,
  end_date,
  country,
  city,
  latitude,
  longitude
) => {
  return api.post(`/users/${creator_id}/trips`, {
    trip: {
      creator_id: creator_id,
      start_date: start_date,
      end_date: end_date,
      country: country,
      location: city,
      latitude: latitude,
      longitude: longitude,
    },
  });
};

export const fetchLatLong = (city) => {
  return axios
    .get(
      `https://api.geoapify.com/v1/geocode/search?text=${city}&apiKey=f124a95983fb473899d9b4a0fbd69ef5`
    )
    .then((response) => {
      return response.data.features[0].geometry.coordinates;
    });
};
