import { createSlice } from "@reduxjs/toolkit";

const konfirmasiSlice = createSlice({
  name: "konfirmasi",
  initialState: { patients: null, patientDetail: null, loading: false },
  reducers: {
    replacePatients(state, action) {
      state.patients = action.payload.patients;
      state.loading = false;
    },
    replacePatientDetail(state, action) {
      state.patientDetail = action.payload.patientDetail;
    },
    setLoading(state){
      state.loading = !state.loading;
    }
  },
});

export const konfirmasiActions = konfirmasiSlice.actions;

export default konfirmasiSlice.reducer;
