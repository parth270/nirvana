import { configureStore } from "@reduxjs/toolkit";
import threeReducer from "./three";
export const store = configureStore({
  reducer: { three: threeReducer },
});
