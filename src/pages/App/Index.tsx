import logo from "/Senac_logo.svg.png";

import Nav from "react-bootstrap/Nav";

import style from "./style.module.css";
import { MenuMobile } from "./MenuMobile";

import { Outlet } from "react-router";

export const Index = () => {
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
            <Nav.Link className={style.nav} href="/app/home">
              HOME
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className={style.nav} href="/app/curso">
              CURSO
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className={style.nav} href="/app/turma">
              TURMA
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className={style.nav} href="/app/sala">
              SALA
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className={style.nav} href="/app/reserva">
              RESERVA
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className={style.nav} href="/app/usuarios">
              USUÁRIOS
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className={style.nav} href="/">
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
