import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "./slices/state";
import timerReducer from "./slices/time";

export const store = configureStore({
  reducer: {
    players: playersReducer,
    timer: timerReducer,
  },
});
