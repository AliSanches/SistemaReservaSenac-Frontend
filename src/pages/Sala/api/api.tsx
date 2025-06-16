import axios from "axios";
import { Sala } from "./types";

export const create = async (data: Sala) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("user")!).state;

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/sala`,
      {
        data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch {
    return;
  }
};

export const update = async (id: number | undefined, data: Sala) => {
  try {
    const { token } = await JSON.parse(localStorage.getItem("user")!).state;

    return await axios.put(
      `${import.meta.env.VITE_API_URL}/sala/${id}`,
      {
        data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch {
    return;
  }
};

export const getSala = async (skip: number) => {
  try {
    const { token } = await JSON.parse(localStorage.getItem("user")!).state;

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/sala`, {
      params: {
        skip,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.retorno;
  } catch {
    return [];
  }
};

export const getTurmaRefCurso = async (id: number) => {
  try {
    const { token } = await JSON.parse(localStorage.getItem("user")!).state;

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/sala/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.retorno;
  } catch {
    return [];
  }
};


export const remove = async (id: number | undefined) => {
  try {
    const { token } = await JSON.parse(localStorage.getItem("user")!).state;

    return await axios.delete(`${import.meta.env.VITE_API_URL}/sala/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw error;
  }
};

export const pagination = async (data: number) => {
  try {
    const { token } = await JSON.parse(localStorage.getItem("user")!).state;

    return await axios.post(
      `${import.meta.env.VITE_API_URL}/sala`,
      {
        data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch {
    return;
  }
};
