import { configureStore } from "@reduxjs/toolkit";
import konfirmasiSlice from "../components/dashboard/Content/konfirmasi/konfirmasi-slice";
import profilSlice from "../components/dashboard/Content/profil/profil-slice";

const store = configureStore({
  reducer: { konfirmasi: konfirmasiSlice, profil: profilSlice },
});

export default store;
