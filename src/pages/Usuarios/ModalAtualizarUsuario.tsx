import { useState }  from "react";
import Modal         from "react-bootstrap/Modal";
import Button        from "react-bootstrap/Button";
import Form          from "react-bootstrap/Form";

export const ModalAtualizarUsuario = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" className="shadow" onClick={handleShow}>
        Atualizar
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Atualizar Usuário</Modal.Title>
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
          <Button variant="primary">Atualizar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
