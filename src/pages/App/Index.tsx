import logo from "/Senac_logo.svg.png";

import Nav from "react-bootstrap/Nav";

import style from "./style.module.css";
import { MenuMobile } from "./MenuMobile";

import { useNavigate, Outlet } from "react-router";

export const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-0">
      <div className="container-lg d-flex justify-content-center my-2">
        <img style={{ width: "220px" }} src={logo} alt={logo} />
      </div>
      <header
        className="container-fluid d-flex justify-content-center bg-primary my-3"
        style={{ height: "80px" }}
      >
        <div className="d-none d-md-flex justify-content-center align-items-center gap-5">
          <Nav.Item>
            <Nav.Link
              className={style.nav}
              onClick={() => navigate("/app/home")}
            >
              HOME
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={style.nav}
              onClick={() => navigate("/app/curso")}
            >
              CURSO
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={style.nav}
              onClick={() => navigate("/app/turma")}
            >
              TURMA
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={style.nav}
              onClick={() => navigate("/app/sala")}
            >
              SALA
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={style.nav}
              onClick={() => navigate("/app/reserva")}
            >
              RESERVA
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={style.nav}
              onClick={() => navigate("/app/usuarios")}
            >
              USUÁRIOS
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className={style.nav} onClick={() => navigate("/")}>
              SAIR
            </Nav.Link>
          </Nav.Item>
        </div>
        <MenuMobile />
      </header>
      <Outlet />
    </div>
  );
};
