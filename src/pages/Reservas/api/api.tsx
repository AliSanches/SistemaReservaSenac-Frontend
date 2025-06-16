import axios from "axios";
import { Reserva } from "./types";

export const create = async (data: Reserva) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("user")!).state;

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/reserva`,
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
  } catch (error) {
    throw error;
  }
};

export const update = async (id: number | undefined, data: Reserva) => {
  try {
    const { token } = await JSON.parse(localStorage.getItem("user")!).state;

    return await axios.put(
      `${import.meta.env.VITE_API_URL}/reserva/${id}`,
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

export const getReserva = async (skip: number) => {
  try {
    const { token } = await JSON.parse(localStorage.getItem("user")!).state;

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/reserva`, {
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

    return await axios.delete(`${import.meta.env.VITE_API_URL}/reserva/${id}`, {
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
      `${import.meta.env.VITE_API_URL}/reserva`,
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
