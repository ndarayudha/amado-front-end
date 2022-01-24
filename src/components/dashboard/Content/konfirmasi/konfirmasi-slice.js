import { createSlice } from "@reduxjs/toolkit";

const konfirmasiSlice = createSlice({
  name: "konfirmasi",
  initialState: { patients: null },
  reducers: {
     replacePatients(state, action){
         state.patients = action.payload.patients;
     }
  },
});

export const konfirmasiActions = konfirmasiSlice.actions;

export default konfirmasiSlice.reducer;
