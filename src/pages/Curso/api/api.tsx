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

export const getCursos = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/curso`);

    return response.data.retorno;
  } catch {
    return [];
  }
};
