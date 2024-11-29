import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

import { FiMenu } from "react-icons/fi";

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
        <Offcanvas.Body></Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
