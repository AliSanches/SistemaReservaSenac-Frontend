import logo from "/Senac_logo.svg.png";

import Nav from "react-bootstrap/Nav";

import style from "./style.module.css";
import { MenuMobile } from "./MenuMobile";

import { NavLink, Outlet } from "react-router";

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
        <nav className="d-none d-md-flex justify-content-center align-items-center gap-5">
          <Nav.Item>
            <NavLink
              to="/app/home"
              className={({ isActive }) =>
                isActive ? `${style.nav} ${style.active}` : style.nav
              }
            >
              HOME
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              to={"/app/curso"}
              className={({ isActive }) =>
                isActive ? `${style.nav} ${style.active}` : style.nav
              }
            >
              CURSO
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              to={"/app/turma"}
              className={({ isActive }) =>
                isActive ? `${style.nav} ${style.active}` : style.nav
              }
            >
              TURMA
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              to={"/app/sala"}
              className={({ isActive }) =>
                isActive ? `${style.nav} ${style.active}` : style.nav
              }
            >
              SALA
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              to={"/app/reserva"}
              className={({ isActive }) =>
                isActive ? `${style.nav} ${style.active}` : style.nav
              }
            >
              RESERVA
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              to={"/app/usuarios"}
              className={({ isActive }) =>
                isActive ? `${style.nav} ${style.active}` : style.nav
              }
            >
              USUÁRIOS
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? `${style.nav} ${style.active}` : style.nav
              }
            >
              SAIR
            </NavLink>
          </Nav.Item>
        </nav>
        <MenuMobile />
      </header>
      <Outlet />
    </div>
  );
};
