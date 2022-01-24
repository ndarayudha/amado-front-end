import { configureStore } from "@reduxjs/toolkit";
import konfirmasiSlice from "../components/dashboard/Content/konfirmasi/konfirmasi-slice";

const store = configureStore({
  reducer: { konfirmasi: konfirmasiSlice },
});

export default store;
