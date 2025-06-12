import axios from "axios";
import { Curso } from "./types";


export const uploadFile = async (file: any) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("user")!).state;

    const data = new FormData();
    data.append('arquivo', file)

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/files`,
        data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  } catch (error) {
    return null;
  }
}

export const create = async (data: Curso, arquivo: File) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("user")!).state;

    const formData = new FormData();
    formData.append("arquivo", arquivo);
    formData.append("nome", data.nome);
    formData.append("categoria", data.categoria);


    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/curso`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (err) {
    console.error("Erro ao criar curso:", err);
    return;
  }
};

export const update = async (id: number | undefined, data: Curso,  arquivo: File) => {
  try {
    const { token } = await JSON.parse(localStorage.getItem("user")!).state;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("arquivo", arquivo);
    formData.append("nome", data.nome);
    formData.append("categoria", data.categoria);

    return await axios.put(
      `${import.meta.env.VITE_API_URL}/curso/${id}`,{formData},
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
