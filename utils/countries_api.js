import axios from "axios";

const countriesAPI = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

export const getFlagCountryByName = (name) => {
  return countriesAPI.get(`/name/${name}?fullText=true`).then((response) => {
    return response.data[0].flags.png;
  });
};
