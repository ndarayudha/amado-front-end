const LOCAL_DOMAIN = "http://localhost:8000";

export async function getAllPatientLocation() {
  const response = await fetch(
    `${LOCAL_DOMAIN}/doctor/geolocation/patient/all`
  );

  const data = await response.json();

  if (data.code === 400) {
    throw new Error(data.message);
  } else {
    return data;
  }
}
