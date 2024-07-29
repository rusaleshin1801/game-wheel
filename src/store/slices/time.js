import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: 90,
  winner: null,
};

const timerReducer = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
    reset: () => initialState,
  },
});

export const { setTime, setWinner, reset } = timerReducer.actions;
export default timerReducer.reducer;
