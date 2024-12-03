import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const ModalExcluirReserva = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" className="shadow" onClick={handleShow}>
        Excluir
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Excluir Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Form.Label>Sala</Form.Label>
            <Form.Select aria-label="Selecione a sala" className="mb-3">
              <option value="1">401</option>
              <option value="1">405</option>
              <option value="1">502</option>
            </Form.Select>

            <Form.Label>Curso</Form.Label>
            <Form.Select aria-label="Selecione o curso" className="mb-3">
              <option value="1">Administração</option>
              <option value="1">Biologia</option>
              <option value="1">Design</option>
            </Form.Select>

            <Form.Label>Turma</Form.Label>
            <Form.Select aria-label="Selecione a turma" className="mb-3">
              <option value="1">1</option>
              <option value="1">2</option>
              <option value="1">3</option>
            </Form.Select>

            <Form.Label>Reserva Início</Form.Label>
            <Form.Control type="date" className="mb-3" />

            <Form.Label>Reserva Término</Form.Label>
            <Form.Control type="date" className="mb-3" />

            <Form.Label>Hora Início</Form.Label>
            <Form.Control type="text" className="mb-3" placeholder="00:00" />

            <Form.Label>Hora Término</Form.Label>
            <Form.Control type="text" className="mb-3" placeholder="00:00" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Voltar
          </Button>
          <Button variant="danger">Excluir</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
