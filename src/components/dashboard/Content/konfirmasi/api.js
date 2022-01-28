import { konfirmasiActions } from "./konfirmasi-slice";

const ENDPOINT_PROFILE = `${process.env.REACT_APP_DOMAIN}/doctor/patients`;
const ENDPOINT_GET_PATIENT_BY_ID = `${process.env.REACT_APP_DOMAIN}/konfirmasi/patient?id=`;
const ENDPOINT_KONFIRMASI_PASIEN = `${process.env.REACT_APP_DOMAIN}/mail/konfirmasi`;

export const konfirmasiPasien = (idPatient, konfirmasiData) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(ENDPOINT_KONFIRMASI_PASIEN, {
        method: "POST",
        body: JSON.stringify({
          id_patient: idPatient,
          kode_konfirmasi: konfirmasiData.kode_konfirmasi,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("fetch patients data failed");
      }

      const data = await response.json();

      return data;
    };

    try {
      await fetchData();
      dispatch(fetchNewPatientsData());
    } catch (error) {}
  };
};

export const fetchNewPatientsData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(ENDPOINT_PROFILE);

      if (!response.ok) {
        throw new Error("fetch patients data failed");
      }

      const data = await response.json();

      return data;
    };

    try {
      const patientsData = await fetchData();
      dispatch(
        konfirmasiActions.replacePatients({
          patients: patientsData.data || [],
        })
      );
    } catch (error) {}
  };
};

export const getNewPatientDataById = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(ENDPOINT_GET_PATIENT_BY_ID + id);

      if (!response.ok) {
        throw new Error("fetch patients data failed");
      }

      const data = await response.json();

      return data;
    };

    try {
      const patientsData = await fetchData();

      dispatch(
        konfirmasiActions.replacePatientDetail({
          patientDetail: patientsData.patient || [],
        })
      );
    } catch (error) {}
  };
};
