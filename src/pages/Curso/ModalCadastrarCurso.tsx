import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import { IoAdd } from "react-icons/io5";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { create } from "./api/api";
import { notify } from "../../components/notify";
import { categorias } from "./constantes";

export const ModalCadastrarCurso: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nome, setNome] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");

  const data = {
    nome: nome,
    categoria: categoria,
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => create(data),
    onSuccess: (response) => {
      if (response?.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["lista-cursos"] });

        setNome("");
        setCategoria("");
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
              required
            />
          </FloatingLabel>

          <Form.Label>Tipo do curso</Form.Label>
          <Form.Select
            aria-label="Selecione o tipo do curso"
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            {categorias.map((index, indice) => (
              <option key={indice} value={index}>
                {index}
              </option>
            ))}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Voltar
          </Button>
          <Button variant="primary" type="submit" onClick={() => mutate()}>
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
