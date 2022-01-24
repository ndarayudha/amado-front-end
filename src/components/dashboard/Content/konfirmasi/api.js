import { konfirmasiActions } from "./konfirmasi-slice";

const DOMAIN = `${process.env.REACT_APP_DOMAIN}/doctor/patients`;

export const fetchNewPatientsData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(DOMAIN);

      if (!response.ok) {
        throw new Error("fetch patients data failed");
      }

      const data = await response.json();

      return data;
    };

    try {
        const patientsData = await fetchData();
        dispatch(konfirmasiActions.replacePatients({
            patients: patientsData.data || []
        }))
      } catch (error) {}
  };

  
};
