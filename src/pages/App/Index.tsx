import logo from "/Senac_logo.svg.png";

import Nav from "react-bootstrap/Nav";

import style from "./style.module.css";
import { MenuMobile } from "./MenuMobile";

import { NavLink, Outlet, useNavigate } from "react-router";
import { Footer } from "../Footer/Footer";
import UserStore from "../../store/userStore";
import { Button } from "react-bootstrap";

export const Index = () => {
  const user: any = UserStore();
  const navigate = useNavigate();

  const logoutUser = () => {
    user.logout(navigate);
  };

  return (
    <div className="container-fluid p-0" style={{ height: "100vh" }}>
      <div className="container-lg d-flex justify-content-center pt-3">
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
            <Button onClick={logoutUser}>SAIR</Button>
          </Nav.Item>
        </nav>
        <MenuMobile />
      </header>
      <main className={`container-fluid`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
