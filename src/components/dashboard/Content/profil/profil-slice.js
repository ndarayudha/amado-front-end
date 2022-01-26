import { createSlice } from "@reduxjs/toolkit";

const profilSlice = createSlice({
  name: "profil",
  initialState: { doctor: null, photo: null },
  reducers: {
    replaceDoctorProfile(state, action) {
      state.doctor = action.payload.doctor;
    },
    replacePhoto(state, action) {
      state.doctor.photo = action.payload.photo;
    },
  },
});

export const profilAction = profilSlice.actions;

export default profilSlice.reducer;
