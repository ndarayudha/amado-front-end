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
    closeContacts: [],
    firstRecordMonitoring: {
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
    secondRecordMonitoring: {
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
    thirdRecordMonitoring: {
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
  },
  reducers: {
    setRecordDataSensor(state, action) {
      state.firstRecordMonitoring.series[0].data = action.payload.spo21;
      state.firstRecordMonitoring.series[1].data = action.payload.bpm1;
      state.firstRecordMonitoring.date = action.payload.date1;
      state.secondRecordMonitoring.series[0].data = action.payload.spo22;
      state.secondRecordMonitoring.series[1].data = action.payload.bpm2;
      state.secondRecordMonitoring.date = action.payload.date2;
      state.thirdRecordMonitoring.series[0].data = action.payload.spo23;
      state.thirdRecordMonitoring.series[1].data = action.payload.bpm3;
      state.thirdRecordMonitoring.date = action.payload.date3;
    },
    setCloseContacts(state, action) {
      state.closeContacts = action.payload.closeContacts;
    },
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
