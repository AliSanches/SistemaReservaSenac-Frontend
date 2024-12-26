import axios from "axios";
import { Curso } from "./types";

export const create = async (data: Curso) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("user")!).state;

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/curso`,
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

export const update = async (id: number | undefined, data: Curso) => {
  try {
    const { token } = await JSON.parse(localStorage.getItem("user")!).state;

    return await axios.put(
      `${import.meta.env.VITE_API_URL}/curso/${id}`,
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

export const getCursos = async (skip: number) => {
  try {
    const { token } = await JSON.parse(localStorage.getItem("user")!).state;

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/curso`, {
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

export const remove = async (id: number | undefined) => {
  try {
    const { token } = await JSON.parse(localStorage.getItem("user")!).state;

    return await axios.delete(`${import.meta.env.VITE_API_URL}/curso/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch {
    return;
  }
};

export const pagination = async (data: number) => {
  try {
    const { token } = await JSON.parse(localStorage.getItem("user")!).state;

    return await axios.post(
      `${import.meta.env.VITE_API_URL}/curso`,
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
