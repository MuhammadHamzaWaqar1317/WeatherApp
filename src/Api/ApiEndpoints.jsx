import api from "./Interceptor";
const APIKEY = import.meta.env.VITE_API_KEY;

export const getWeather = (city, unit) =>
  api.get(`?q=${city}&APPID=${APIKEY}&units=${unit}`);

export const getLocationWeather = (lat, lon, unit) =>
  api.get(`?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=${unit}`);
