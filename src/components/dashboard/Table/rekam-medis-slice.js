import { createSlice } from "@reduxjs/toolkit";

const rekamMedisSlice = createSlice({
  name: "records",
  initialState: { records: null, loading: true, detailBio: null },
  reducers: {
    setListPatientRecords(state, action) {
      state.records = action.payload.records;
    },
    setLoading(state, action) {
      state.loading = action.payload.loading;
    },
    setDetailBio(state, action) {
      state.detailBio = action.payload.detailBio;
    },
  },
});

export const rekamMedisActions = rekamMedisSlice.actions;

export default rekamMedisSlice.reducer;
