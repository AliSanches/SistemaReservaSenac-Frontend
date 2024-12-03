import style from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer
      className={`container-fluid bg-primary d-flex justify-content-center align-items-center text-white position-fixed bottom-0 ${style.fs_12}`}
      style={{ height: "50px" }}
    >
      © Copyright 2025 - Todos os direitos reservados
    </footer>
  );
};
