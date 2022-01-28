import { createSlice } from "@reduxjs/toolkit";

const statistikSlice = createSlice({
  name: "statistik",
  initialState: { counts: null, currentPatient: null, countGejala: null },
  reducers: {
    setCountData(state, action) {
      state.counts= action.payload.counts;
    },
    setCurrentPatient(state, action) {
      state.currentPatient = action.payload.currentPatient;
    },
  },
});

export const statistikAction = statistikSlice.actions;

export default statistikSlice.reducer;
