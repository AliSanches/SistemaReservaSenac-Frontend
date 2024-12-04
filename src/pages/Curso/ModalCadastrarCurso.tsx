import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import { IoAdd } from "react-icons/io5";

export const ModalCadastrarCurso: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <Modal.Title>Cadastrar Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FloatingLabel
              controlId="floatingInput"
              label="Nome do curso"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="curso" />
            </FloatingLabel>

            <Form.Label>Tipo do curso</Form.Label>
            <Form.Select aria-label="Selecione o tipo do curso">
              <option value="1">Graduação</option>
              <option value="1">Técnico</option>
              <option value="1">Pós graduação</option>
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
