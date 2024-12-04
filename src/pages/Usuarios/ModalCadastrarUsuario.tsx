import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { IoAdd } from "react-icons/io5";

export const ModalCadastrarUsuario = () => {
  const [show, setShow] = useState(false);

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
          <Modal.Title>Cadastrar Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" className="mb-3" />

            <Form.Label>Nome de Login</Form.Label>
            <Form.Control type="text" className="mb-3" />

            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" className="mb-3" />

            <Form.Label>Permissão</Form.Label>
            <Form.Select aria-label="Selecione a permissao" className="mb-3">
              <option value="1">Administrador</option>
              <option value="1">Comum</option>
            </Form.Select>

            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="mail"
              className="mb-3"
              placeholder="exemplo@exemplo.com.br"
            />
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
