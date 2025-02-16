import axios from "axios";

const API_URL = "http://localhost:3333/api/v1";

// get token from local storage if exists
const token = localStorage.getItem("token") || "";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    console.log(response);
    if (response.status == 200) {
      localStorage.setItem("token", response.data.token);
      return response;
    }

    return response;
  } catch (error) {
    return error;
  }
};

export const register = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      fullName,
      email,
      password,
    });

    console.log(response);

    return response;
  } catch (error) {
    return error;
  }
};

export const getUser = async (): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error: any) {
    return error;
  }
};

export const deleteUser = async (id: string) => {
  const response = await axios.delete(`${API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      id,
    },
  });
  return response;
};

export const editUser = async (
  id: string,
  fullName?: string,
  email?: string,
  password?: string
) => {
  const response = await axios.put(
    `${API_URL}/dashboard`,
    {
      id,
      fullName,
      email,
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
