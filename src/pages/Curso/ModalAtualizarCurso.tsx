import { useState }       from "react";
import Modal              from "react-bootstrap/Modal";
import Button             from "react-bootstrap/Button";
import FloatingLabel      from "react-bootstrap/FloatingLabel";
import Form               from "react-bootstrap/Form";
import { update }         from "./api/api";
import { DadosCurso }     from "./api/types";
import { notify }         from "../../components/notify";
import { categorias }     from "./constantes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const ModalAtualizarCurso: React.FC<DadosCurso> = ({ dadosCurso }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nome, setNome] = useState<string>(dadosCurso.nome);
  const [categoria, setCategoria] = useState<string>(dadosCurso.categoria);

  const data = {
    nome: nome,
    categoria: categoria,
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => await update(dadosCurso.id, data),
    onSuccess: (response) => {
      if (response?.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["lista-cursos"] });

        setShow(false);

        notify(response.data.message, "success");
      } else if (response?.status === 400) {
        setNome("");
        setCategoria("");
        setShow(false);

        notify(response.data.message, "warning");
      } else if (response?.status === 500) {
        setShow(false);

        notify(response.data.message, "error");
      }
    },
  });

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
          <Modal.Title>Atualizar Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Nome do curso"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="curso"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </FloatingLabel>

          <Form.Label>Tipo do curso</Form.Label>
          <Form.Select
            aria-label="Selecione o tipo do curso"
            onChange={(e) => setCategoria(e.target.value)}
            value={categoria}
          >
            {categorias.map((indice, index) => (
              <option key={index} value={indice}>
                {indice}
              </option>
            ))}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Voltar
          </Button>
          <Button variant="primary" type="submit" onClick={() => mutate()}>
            Atualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
