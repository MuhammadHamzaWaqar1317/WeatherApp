import { configureStore } from "@reduxjs/toolkit";
import weatherDataSlice from "./src/Redux/Slices/weatherDataSlice";
export const store = configureStore({
  reducer: {
    weatherDataSlice,
  },
});
