import style from "./style.module.css";

import logo from "/Senac_logo.svg.png";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export const Login = () => {
  return (
    <main
      className={`${style.fundo} container-fluid d-flex justify-content-center align-items-center`}
    >
      <div
        className="container-lg d-flex justify-content-center align-items-center"
        style={{ height: "100vh", width: "100vw" }}
      >
        <div
          className={`${style.containerDimensao} bg-light shadow-lg rounded `}
        >
          <div className="container my-4 d-flex justify-content-center">
            <img className={style.logo} src={logo} alt={logo} />
          </div>

          <div className="container my-4 d-flex flex-column gap-3">
            <FloatingLabel
              controlId="floatingInput"
              label="E-mail"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="nome@exemplo.com" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Senha">
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
          </div>

          <div className="container my-4">
            <button className="btn btn-primary shadow-sm">Entrar</button>
          </div>
        </div>
      </div>
    </main>
  );
};
