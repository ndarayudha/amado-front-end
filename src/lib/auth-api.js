import {url} from '../util/endpoints';

export async function login(loginData) {
  const response = await fetch(`${url.prod}/doctor/v1/login`, {
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
