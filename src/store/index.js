import { configureStore } from "@reduxjs/toolkit";
import konfirmasiSlice from "../components/dashboard/Content/konfirmasi/konfirmasi-slice";
import profilSlice from "../components/dashboard/Content/profil/profil-slice";
import statistikSlice from "../components/dashboard/Content/statistik/statistik-slice";
import rekamMedisSlice from "../components/dashboard/Table/rekam-medis-slice";

const store = configureStore({
  reducer: {
    konfirmasi: konfirmasiSlice,
    profil: profilSlice,
    statistik: statistikSlice,
    records: rekamMedisSlice,
  },
});

export default store;
