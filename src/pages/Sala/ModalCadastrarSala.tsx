import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { IoAdd } from "react-icons/io5";

export const ModalCadastrarSala = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const rows = [];

  for (let i = 0; i <= 500; i++) {
    rows.push(i);
  }

  const sala = [];

  for (let i = 0; i <= 1000; i++) {
    sala.push(i);
  }

  return (
    <>
      <button
        className="fs-4 text-white py-1 px-2 rounded border-0 bg-primary"
        onClick={handleShow}
      >
        <IoAdd />
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar Sala</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Form.Label>Número da sala</Form.Label>
            <Form.Select aria-label="Nome do curso" className="mb-3">
              {sala.map((index, qtd) => (
                <option key={index}>{qtd}</option>
              ))}
            </Form.Select>

            <Form.Label>Capacidade de alunos</Form.Label>
            <Form.Control type="number" maxLength={3} className="mb-3" />

            <Form.Label>Tipo da Sala</Form.Label>
            <Form.Select aria-label="Tipo da sala" className="mb-3">
              <option>Laboratório de Informática</option>
              <option>Laboratório de Farmacia</option>
            </Form.Select>

            <Form.Label>Case (armário)</Form.Label>
            <Form.Select aria-label="Tipo da sala" className="mb-3">
              <option>Sim</option>
              <option>Não</option>
            </Form.Select>

            <Form.Label>Comporta Notebook</Form.Label>
            <Form.Select aria-label="Tipo da sala" className="mb-3">
              <option>Sim</option>
              <option>Não</option>
            </Form.Select>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Voltar
          </Button>
          <Button variant="primary">Cadastrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
