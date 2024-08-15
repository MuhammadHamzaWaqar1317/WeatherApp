import { createSlice } from "@reduxjs/toolkit";
import {
  getCityData,
  multipleCityData,
  locationWeather,
} from "../Thunks/cityDataApi";
import { icons } from "../../assets/icons/icons";
import moment from "moment";
const initialState = {
  tempUnit: "C",

  cityData: {
    coord: {
      lon: 73.0679,
      lat: 33.6007,
    },
    weather: [
      {
        id: 803,
        main: "Clouds",
        description: "broken clouds",
        icon: "04d",
      },
    ],
    base: "stations",
    main: {
      temp: 96.24,
      feels_like: 108.84,
      temp_min: 96.24,
      temp_max: 96.24,
      pressure: 1001,
      humidity: 64,
      sea_level: 1001,
      grnd_level: 938,
    },
    visibility: 10000,
    wind: {
      speed: 3,
      deg: 153,
      gust: 7,
    },
    clouds: {
      all: 76,
    },
    dt: 1723640582,
    sys: {
      type: 2,
      id: 2007435,
      country: "PK",
      sunrise: 1723595361,
      sunset: 1723643739,
    },
    timezone: 18000,
    id: 1166993,
    name: "Rawalpindi",
    cod: 200,
  },

  multipleCity: [],
};

const formatData = (data) => {
  const visibility = data.visibility;
  const windSpeed = data.wind.speed;
  const temp = data.main.temp;
  const tempMax = data.main.temp_max;
  const tempMin = data.main.temp_min;
  const feelsLike = data.main.feels_like;
  const date = moment.unix(data.dt);

  data.main.temp = Math.trunc(temp);
  data.main.temp_max = Math.trunc(tempMax);
  data.main.temp_min = Math.trunc(tempMin);
  data.main.feels_like = Math.trunc(feelsLike);

  data.sys.sunrise = moment.unix(data.sys.sunrise).format("h:mm A");

  data.sys.sunset = moment.unix(data.sys.sunset).format("h:mm A");
  data.visibility = visibility >= 1000 ? visibility / 1000 : visibility;
  data.wind.speed = Math.trunc(windSpeed);
  data.dt = date.format("dddd DD MMMM [at] h:mm a");

  const { icon, id } = data.weather[0];
  const { src: iconSrc } = icons.find(
    (item) => item.icon == icon && item.id == id
  );
  console.log("iconSrc", iconSrc);
  data = { ...data, iconSrc };
  console.log("payload Data", data);
  return data;
};

const weatherDataSlice = createSlice({
  name: "weatherDataSlice",
  initialState,
  reducers: {
    changeCityData: (state, action) => {
      state.cityData = action.payload;
    },
    changeTemp: (state, action) => {
      state.tempUnit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCityData.fulfilled, (state, action) => {
      state.cityData = formatData(action.payload.data);
    });
    builder.addCase(getCityData.rejected, (state, action) => {});

    builder.addCase(locationWeather.fulfilled, (state, action) => {
      state.cityData = formatData(action.payload.data);
    });
    builder.addCase(locationWeather.rejected, (state, action) => {});

    builder.addCase(multipleCityData.fulfilled, (state, action) => {
      const data = action.payload.data?.map(({ data }) => {
        return formatData(data);
      });

      console.log("multicity", data);
      state.multipleCity = data;
    });
    builder.addCase(multipleCityData.rejected, (state, action) => {});
  },
});

export const { changeCityData, changeTemp } = weatherDataSlice.actions;

export default weatherDataSlice.reducer;
