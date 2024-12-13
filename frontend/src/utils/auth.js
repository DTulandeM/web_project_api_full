//const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://api.dtmonline.mooo.com";
export async function Signup(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/signup  `, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error al intentar conectarse con el servidor " + error);
  }
}

export async function Authorization(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!email || !password) {
      throw new Error("400 - no se ha proporcionado uno o más campos");
    }

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    localStorage.setItem("jwt", data.token);
    return data;
  } catch (error) {
    console.log("Error al intentar conectarse con el servidor " + error);
  }
}

export async function CheckToken(token) {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.status === 401) {
      throw new Error(" 401 - El token provisto es inválido");
    }
    if (!token) {
      throw new Error("400 - no se ha proporcionado uno o más campos");
    }
    return data;
  } catch (error) {
    console.log("Error al intentar conectarse con el servidor " + error);
  }
}
