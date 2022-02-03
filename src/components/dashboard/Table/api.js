import { rekamMedisActions } from "./rekam-medis-slice";
import moment from "moment";
import storage, {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../../../firebase";

const ENDPOINT_GET_PATIENT_RECORDS = `${process.env.REACT_APP_DOMAIN}/doctor/patient/records`;
const ENDPOINT_GET_PATIENT_BY_ID = `${process.env.REACT_APP_DOMAIN}/konfirmasi/patient?id=`;
const ENDPOINT_GET_SENSOR_DATA_BY_ID = `${process.env.REACT_APP_DOMAIN}/sensor?id=`;
const ENDPOINT_GET_LAST_MONITORING_CODE = `${process.env.REACT_APP_DOMAIN}/sensor/code?id=`;
const ENDPOINT_GET_CLOSE_CONTACT = `${process.env.REACT_APP_DOMAIN}/patient/record?patient_id=`;
const ENDPOINT_GET_RECORD_SENSOR = `${process.env.REACT_APP_DOMAIN}/sensor/records?id=`;
const ENDPOINT_KONFIRMASI_REKAM_MEDIS = `${process.env.REACT_APP_DOMAIN}/records/konfirmasi`;
const ENDPOINT_EMAIL_REKAM_MEDIS = `${process.env.REACT_APP_DOMAIN}/records/konfirmasi/mail`;

export const sendEmailRekamMedis = (recordId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(ENDPOINT_EMAIL_REKAM_MEDIS, {
        method: "POST",
        body: JSON.stringify({
          record_id: recordId,
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
      const result = await fetchData();
      console.log(result);
    } catch (error) {}
  };
};

export const uploadFirebase = (records, id, saran) => {
  return async (dispatch) => {
    const storageRef = ref(storage, "records/" + records.file.name);
    const uploadTask = uploadBytesResumable(
      storageRef,
      records.file.originFileObj
    );

    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        updateRekamMedisStatus({
          id: id,
          url: downloadURL,
          rekomendasi: saran,
        });
      });
    });
  };
};

const updateRekamMedisStatus = async (url) => {
  const fetchData = async () => {
    const response = await fetch(ENDPOINT_KONFIRMASI_REKAM_MEDIS, {
      method: "POST",
      body: JSON.stringify(url),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("fetch doctor profile failed");
    }

    const data = await response.json();

    return data;
  };

  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {}
};

export const getCloseContactPatient = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(ENDPOINT_GET_CLOSE_CONTACT + id);

      if (!response.ok) {
        throw new Error("fetch failed");
      }

      const data = await response.json();

      return data;
    };

    try {
      const responseData = await fetchData();
      dispatch(
        rekamMedisActions.setCloseContacts({
          closeContacts: responseData.close_contacts || [],
        })
      );
    } catch (error) {}
  };
};

export const getLastMonitoringCode = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(ENDPOINT_GET_LAST_MONITORING_CODE + id);

      if (!response.ok) {
        throw new Error("fetch failed");
      }

      const data = await response.json();

      return data;
    };

    try {
      const responseData = await fetchData();
      dispatch(
        rekamMedisActions.setMonitoringCode({
          monitoringCode: responseData.last_monitoring_code || [],
        })
      );
    } catch (error) {}
  };
};

export const getRecordSensorDataById = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(ENDPOINT_GET_RECORD_SENSOR + id);

      if (!response.ok) {
        throw new Error("fetch failed");
      }

      const data = await response.json();

      return data;
    };

    try {
      dispatch(
        rekamMedisActions.setChartLoading({
          loading: true,
        })
      );
      const responseData = await fetchData();

      dispatch(
        rekamMedisActions.setRecordDataSensor({
          spo21: responseData.data_pengukuran.pengukuran_1.spo2,
          bpm1: responseData.data_pengukuran.pengukuran_1.bpm,
          date1: responseData.data_pengukuran.pengukuran_1.date,
          spo22: responseData.data_pengukuran.pengukuran_2.spo2,
          bpm2: responseData.data_pengukuran.pengukuran_2.bpm,
          date2: responseData.data_pengukuran.pengukuran_2.date,
          spo23: responseData.data_pengukuran.pengukuran_3.spo2,
          bpm3: responseData.data_pengukuran.pengukuran_3.bpm,
          date3: responseData.data_pengukuran.pengukuran_3.date,
        })
      );

      dispatch(
        rekamMedisActions.setChartLoading({
          loading: false,
        })
      );
    } catch (error) {}
  };
};

export const getSensorDataById = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(ENDPOINT_GET_SENSOR_DATA_BY_ID + id);

      if (!response.ok) {
        throw new Error("fetch failed");
      }

      const data = await response.json();

      return data;
    };

    try {
      dispatch(
        rekamMedisActions.setChartLoading({
          loading: true,
        })
      );
      const responseData = await fetchData();

      let spo2 = [];
      let bpm = [];
      let date = [];

      for (let data of responseData.data) {
        spo2.push(+data.spo2);
        bpm.push(+data.bpm);
        date.push(data.created_at);
      }

      dispatch(
        rekamMedisActions.setDataSensor({
          spo2: spo2,
          bpm: bpm,
          date: date,
        })
      );
      dispatch(
        rekamMedisActions.setChartLoading({
          loading: false,
        })
      );
    } catch (error) {}
  };
};

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
          detailBio: responseData.patient || [],
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
                url: medicalRecords[i].medicalRecord[j].url
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

      dispatch(
        rekamMedisActions.setDataSensor({
          spo2: [],
          bpm: [],
          date: [],
        })
      );
    } catch (error) {}
  };
};
