import axios from "axios";
import { NavigateFunction } from "react-router";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { notify } from "../components/notify";

const url = `${import.meta.env.VITE_API_URL}`;

const UserStore = create(
  persist(
    (set) => ({
      id: null,
      enable: null,
      nome: null,
      email: null,
      senha: null,
      token: null,
      createdAt: null,
      updatedAt: null,

      authenticate: async (data: string, navigate: NavigateFunction) => {
        try {
          const response = await axios.post(`${url}/authenticate`, {
            data,
          });

          if (response.status === 200) {
            let jsonUser = response.data.data.mail;
            set({
              id: jsonUser.id,
              enable: jsonUser.enable,
              nome: jsonUser.nome,
              email: jsonUser.email,
              senha: jsonUser.senha,
              createdAt: jsonUser.createdAt,
              updatedAt: jsonUser.updatedAt,
            });

            let token = response.data.data.token;
            set({
              token: token,
            });

            notify(response.data.message, "success");
            navigate("/app/home");
          } else if (response.status === 400) {
            notify(response.data.message, "warning");
          } else if (response.status === 500) {
            notify(response.data.message, "error");
          }
        } catch {
          return null;
        }
      },

      logout: (navigate: NavigateFunction) => {
        set({
          name: null,
          sena: null,
          email: null,
          token: null,
          id: null,
          permissions: null,
          createdAt: null,
          updatedAt: null,
        });
        navigate("/");
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default UserStore;
