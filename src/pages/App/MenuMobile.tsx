import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import { FiMenu } from "react-icons/fi";

import Nav from "react-bootstrap/Nav";

import { NavLink } from "react-router";

import style from "./style.module.css";

export const MenuMobile = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="d-md-none d-flex align-items-center justify-content-between w-100">
      <div className="mx-auto">
        <h6 className="m-0 text-white">Sistema Reserva de Salas</h6>
      </div>
      <Button variant="primary" onClick={handleShow} className="fs-2">
        <FiMenu />
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="top">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Senac Piracicaba, SP</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav className="d-flex flex-column align-items-left gap-2">
            <Nav.Item>
              <NavLink
                to="/app/home"
                className={({ isActive }) =>
                  isActive
                    ? `${style.navMobile} ${style.active}`
                    : style.navMobile
                }
              >
                HOME
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to={"/app/curso"}
                className={({ isActive }) =>
                  isActive
                    ? `${style.navMobile} ${style.active}`
                    : style.navMobile
                }
              >
                CURSO
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to={"/app/turma"}
                className={({ isActive }) =>
                  isActive
                    ? `${style.navMobile} ${style.active}`
                    : style.navMobile
                }
              >
                TURMA
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to={"/app/sala"}
                className={({ isActive }) =>
                  isActive
                    ? `${style.navMobile} ${style.active}`
                    : style.navMobile
                }
              >
                SALA
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to={"/app/reserva"}
                className={({ isActive }) =>
                  isActive
                    ? `${style.navMobile} ${style.active}`
                    : style.navMobile
                }
              >
                RESERVA
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to={"/app/usuarios"}
                className={({ isActive }) =>
                  isActive
                    ? `${style.navMobile} ${style.active}`
                    : style.navMobile
                }
              >
                USUÁRIOS
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? `${style.navMobile} ${style.active}`
                    : style.navMobile
                }
              >
                SAIR
              </NavLink>
            </Nav.Item>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
