import axios from "axios";
import { Turma } from "./types";

export const create = async (data: Turma) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("user")!).state;

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/turma`,
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

export const update = async (id: number | undefined, data: Turma) => {
  try {
    const { token } = await JSON.parse(localStorage.getItem("user")!).state;

    return await axios.put(
      `${import.meta.env.VITE_API_URL}/turma/${id}`,
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

export const getTurma = async (skip: number) => {
  try {
    const { token } = await JSON.parse(localStorage.getItem("user")!).state;

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/turma`, {
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

    return await axios.delete(`${import.meta.env.VITE_API_URL}/turma/${id}`, {
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
      `${import.meta.env.VITE_API_URL}/turma`,
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
