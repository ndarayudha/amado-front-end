import { statistikAction } from "./statistik-slice";

const ENDPOINT_GET_COUNT = `${process.env.REACT_APP_DOMAIN}/statistik/count`;
const ENDPOINT_GET_CURRENT_PATIENT = `${process.env.REACT_APP_DOMAIN}/statistik/patient`;

export const getCountFirst = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(ENDPOINT_GET_COUNT);

      if (!response.ok) {
        throw new Error("fetch count failed");
      }

      const data = await response.json();

      return data;
    };

    try {
      const countData = await fetchData();
      dispatch(
        statistikAction.setCountData({
          counts: countData.counts || [],
        })
      );
    } catch (error) {}
  };
};

export const getCurrentPatient = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(ENDPOINT_GET_CURRENT_PATIENT);

      if (!response.ok) {
        throw new Error("fetch current patients failed");
      }

      const data = await response.json();

      return data;
    };

    try {
      const countData = await fetchData();

      dispatch(
        statistikAction.setCurrentPatient({
          currentPatient: countData.patients || [],
        })
      );
    } catch (error) {}
  };
};
