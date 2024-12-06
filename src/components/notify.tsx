import { toast, Bounce } from "react-toastify";

type TypeToast = "success" | "error" | "info" | "warning";

export const notify = (text: string, type: TypeToast) => {
  toast(text, {
    type,
    position: "top-right",
    transition: Bounce,
  });
};
