import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { DadosTurma } from "./api/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCursos } from "../Curso/api/api";
import Spinner from "react-bootstrap/Spinner";
import { Curso as TipoCurso } from "../Curso/api/types";
import { notify } from "../../components/notify";
import { remove } from "./api/api";

export const ModalExcluirTurma: React.FC<DadosTurma> = ({ dadosTurma }) => {
  const [show, setShow] = useState(false);
  const skip = 0;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const rows = [];

  for (let i = 0; i <= 500; i++) {
    rows.push(i);
  }

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => await remove(dadosTurma.id),
    onSuccess: (response) => {
      if (response?.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["lista-turmas"] });
        setShow(false);
        notify(response.data.message, "success");
      } else if (response?.status === 400) {
        setShow(false);
        notify(response.data.message, "warning");
      } else if (response?.status === 500) {
        setShow(false);
        notify(response.data.message, "error");
      }
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["lista-cursos", skip],
    queryFn: () => getCursos(skip),
  });

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
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
          <Modal.Title>Excluir Turma</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Nome do curso</Form.Label>
          <Form.Select
            aria-label="Nome do curso"
            className="mb-3"
            value={dadosTurma.idCurso}
            disabled
          >
            {data.curso.map((indice: TipoCurso) => {
              return (
                <option key={indice.id} value={indice.id}>
                  {indice.nome}
                </option>
              );
            })}
          </Form.Select>

          <Form.Label>Número da turma</Form.Label>
          <Form.Select
            aria-label="Número da turma"
            className="mb-3"
            value={dadosTurma.turma}
            disabled
          >
            {rows.map((index, qtd) => (
              <option key={index}>{qtd}</option>
            ))}
          </Form.Select>

          <Form.Label>Data Início</Form.Label>
          <Form.Control
            type="text"
            className="mb-3"
            value={dadosTurma.dataInicio}
            disabled
          />

          <Form.Label>Data Término</Form.Label>
          <Form.Control
            type="text"
            className="mb-3"
            value={dadosTurma.dataFinal}
            disabled
          />

          <Form.Label>Hora Início</Form.Label>
          <Form.Control
            type="text"
            className="mb-3"
            placeholder="00:00"
            value={dadosTurma.entrada}
            disabled
          />

          <Form.Label>Hora Término</Form.Label>
          <Form.Control
            type="text"
            className="mb-3"
            placeholder="00:00"
            value={dadosTurma.saida}
            disabled
          />

          <div className="d-flex justify-content-end gap-4">
            <Button variant="secondary" onClick={handleClose}>
              Voltar
            </Button>
            <Button type="submit" variant="danger" onClick={() => mutate()}>
              Excluir
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
