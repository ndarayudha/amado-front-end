const LOCAL_DOMAIN = "http://localhost:8000";

export async function login(loginData) {
  const response = await fetch(`${LOCAL_DOMAIN}/doctor/v1/login`, {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (data.code === 400) {
    throw new Error(data.message);
  } else {
    return data;
  }
}
