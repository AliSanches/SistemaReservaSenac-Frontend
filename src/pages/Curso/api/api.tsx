import axios from "axios";
import { Curso } from "./types";

export const create = async (data: Curso) => {
  try {
    return await axios
      .post(`${import.meta.env.VITE_API_URL}/curso`, {
        data,
      })
      .then((response) => {
        return response;
      });
  } catch {
    return;
  }
};

export const update = async (id: number | undefined, data: Curso) => {
  try {
    return await axios.put(`${import.meta.env.VITE_API_URL}/curso/${id}`, {
      data,
    });
  } catch {
    return;
  }
};

export const getCursos = async (skip: number) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/curso`, {
      params: {
        skip,
      },
    });

    return response.data.retorno;
  } catch {
    return [];
  }
};

export const remove = async (id: number | undefined) => {
  try {
    return await axios.delete(
      `${import.meta.env.VITE_API_URL}/curso/${id}`,
      {}
    );
  } catch {
    return;
  }
};

export const pagination = async (data: number) => {
  try {
    return await axios.get(`${import.meta.env.VITE_API_URL}/curso`, {
      data,
    });
  } catch {
    return;
  }
};
