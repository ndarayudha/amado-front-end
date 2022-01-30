import { rekamMedisActions } from "./rekam-medis-slice";
import moment from "moment";

const ENDPOINT_GET_PATIENT_RECORDS = `${process.env.REACT_APP_DOMAIN}/doctor/patient/records`;
const ENDPOINT_GET_PATIENT_BY_ID = `${process.env.REACT_APP_DOMAIN}/doctor/patient?id=`;

export const getPaientCurrentMonitoring = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(ENDPOINT_GET_PATIENT_BY_ID + id);

      if (!response.ok) {
        throw new Error("fetch count failed");
      }

      const data = await response.json();

      return data;
    };

    try {
      const responseData = await fetchData();
      dispatch(
        rekamMedisActions.setDetailBio({
          detailBio: responseData.data || [],
        })
      );
    } catch (error) {}
  };
};

export const getRecords = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(ENDPOINT_GET_PATIENT_RECORDS);

      if (!response.ok) {
        throw new Error("fetch count failed");
      }

      const data = await response.json();

      return data;
    };

    try {
      dispatch(
        rekamMedisActions.setLoading({
          loading: true,
        })
      );

      const data = await fetchData();
      const medicalRecords = data.records;

      let patientRecord = [];

      if (medicalRecords !== undefined) {
        for (const i in medicalRecords) {
          // apakah pasien punya rekam medis?
          let isMedicalRecordExist =
            medicalRecords[i].medicalRecord.length !== 0;

          for (const j in medicalRecords[i].medicalRecord) {
            if (isMedicalRecordExist) {
              patientRecord.push({
                key: medicalRecords[i].medicalRecord[j].id,
                idRecord: medicalRecords[i].medicalRecord[j].id,
                name: medicalRecords[i].name,
                age: moment().diff(
                  moment(medicalRecords[i].tanggal_lahir, "DD-MM-YYYY"),
                  "years"
                ),
                address: medicalRecords[i].alamat,
                spo2: medicalRecords[i].medicalRecord[j].averrage_spo2,
                bpm: medicalRecords[i].medicalRecord[j].averrage_bpm,
                konfirmasi: medicalRecords[i].medicalRecord[j].konfirmasi,
              });
            }
          }
        }
      }

      dispatch(
        rekamMedisActions.setListPatientRecords({
          records: patientRecord || [],
        })
      );

      dispatch(
        rekamMedisActions.setLoading({
          loading: false,
        })
      );
    } catch (error) {}
  };
};
