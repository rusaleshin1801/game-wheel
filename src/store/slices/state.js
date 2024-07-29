import { createSlice } from "@reduxjs/toolkit";

const initialState = [{ name: "", ton: "", complete: false, percentage: 0 }];

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      return action.payload;
    },
    updatePlayer: (state, action) => {
      const { index, key, value } = action.payload;
      state[index][key] = value;

      if (index === 9) {
        state[index].complete =
          state[index].name !== "" && state[index].ton !== "";
      }
    },
    addPlayer: (state, action) => {
      const index = action.payload;
      state[index].complete = true;
      state.push({ name: "", ton: "", complete: false, percentage: 0 });
    },
    validatePlayers: (state) => {
      const lastCompleteIndex = state.findIndex(
        (player) => player.complete === false
      );
      if (lastCompleteIndex !== -1 && lastCompleteIndex < state.length - 1) {
        return state.slice(0, lastCompleteIndex + 1);
      }
    },
    removeIncompletePlayers: (state) => {
      return state.filter((player) => player.complete);
    },
    resetPlayers: () => {
      return initialState;
    },
  },
});

export const {
  setPlayers,
  updatePlayer,
  addPlayer,
  validatePlayers,
  removeIncompletePlayers,
  resetPlayers,
} = playersSlice.actions;
export default playersSlice.reducer;
