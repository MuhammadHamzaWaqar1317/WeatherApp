import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWeather, getLocationWeather } from "../../Api/ApiEndpoints";

const cities = ["Paris", "London", "Jakarta", "Munich", "Istanbul"];

export const getCityData = createAsyncThunk(
  "getCityData",
  async (body, { rejectWithValue }) => {
    try {
      console.log(body, "thunk");

      const res = await getWeather(body.city, body.unit);

      return {
        data: res.data,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed `,
      });
    }
  }
);

export const locationWeather = createAsyncThunk(
  "locationWeather",
  async (body, { rejectWithValue }) => {
    try {
      console.log(body, "thunk");
      const { lat, lon, unit } = body;
      const res = await getLocationWeather(lat, lon, unit);

      return {
        data: res.data,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed `,
      });
    }
  }
);

export const multipleCityData = createAsyncThunk(
  "multipleCityData",
  async (body, { rejectWithValue }) => {
    try {
      console.log(body, "thunk");

      const cityRequests = cities.map((city) => getWeather(city, body.unit));

      const results = await Promise.all(cityRequests);

      console.log("Promise All", results);

      return {
        data: results,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error?.response?.data?.error ?? `Failed `,
      });
    }
  }
);
