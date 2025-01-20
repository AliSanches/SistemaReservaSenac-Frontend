import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useQuery } from "@tanstack/react-query";
import { IoAdd } from "react-icons/io5";
import { getCursos } from "../Curso/api/api";
import { Curso as TipoCurso } from "../Curso/api/types";
import Spinner from "react-bootstrap/Spinner";

export const ModalCadastrarSala = () => {
  const [show, setShow] = useState<boolean>(false);
  const skip = 0;

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

  const { data, isLoading } = useQuery({
    queryKey: ["lista-cursos", skip],
    queryFn: () => getCursos(skip),
  });

  if (isLoading) {
    return <Spinner animation="border" variant="primary" />;
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
            <Form.Label>Curso</Form.Label>
            <Form.Select aria-label="Nome do curso" className="mb-3">
              {data.curso.map((index: TipoCurso) => (
                <option key={index.id}>{index.nome}</option>
              ))}
            </Form.Select>

            <Form.Label>Turma</Form.Label>
            <Form.Select aria-label="Turma" className="mb-3">
              {sala.map((index, qtd) => (
                <option key={index}>{qtd}</option>
              ))}
            </Form.Select>

            <Form.Label>Número da sala</Form.Label>
            <Form.Select aria-label="Número da sala" className="mb-3">
              {sala.map((index, qtd) => (
                <option key={index}>{qtd}</option>
              ))}
            </Form.Select>

            <Form.Label>Capacidade de alunos</Form.Label>
            <Form.Control type="number" maxLength={3} className="mb-3" />

            <Form.Label>Tipo da Sala</Form.Label>
            <Form.Select aria-label="Tipo da sala" className="mb-3">
              <option value="lb-informatica">Laboratório de Informática</option>
              <option value="lb-farmacia">Laboratório de Farmácia</option>
            </Form.Select>

            <Form.Label>Case (armário)</Form.Label>
            <Form.Select aria-label="Tipo da sala" className="mb-3">
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </Form.Select>

            <Form.Label>Comporta Notebook</Form.Label>
            <Form.Select aria-label="Tipo da sala" className="mb-3">
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </Form.Select>

            <div className="d-flex justify-content-end gap-4">
              <Button variant="secondary" onClick={handleClose}>
                Voltar
              </Button>
              <Button type="submit" variant="primary">
                Cadastrar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
