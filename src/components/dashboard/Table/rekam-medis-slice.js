import { createSlice } from "@reduxjs/toolkit";

const rekamMedisSlice = createSlice({
  name: "records",
  initialState: {
    records: null,
    loading: true,
    detailBio: null,
    monitoringCode: null,
    detailCode: null,
    chartData: {
      series: [
        {
          name: "Spo2",
          data: [],
        },
        {
          name: "Bpm",
          data: [],
        },
      ],
      date: [],
    },
    loadingChart: false,
  },
  reducers: {
    setChartLoading(state, action) {
      state.loadingChart = action.payload.loading;
    },
    setDataSensor(state, action) {
      state.chartData.series[0].data = action.payload.spo2;
      state.chartData.series[1].data = action.payload.bpm;
      state.chartData.date = action.payload.date;
    },
    setMonitoringCode(state, action) {
      state.monitoringCode = action.payload.monitoringCode;
    },
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
