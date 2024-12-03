import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export const ModalExcluirCurso = () => {
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
          <Modal.Title>Excluir Curso</Modal.Title>
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
          <Button variant="danger">Excluir</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
