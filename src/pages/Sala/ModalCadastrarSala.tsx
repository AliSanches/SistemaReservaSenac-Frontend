import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IoAdd } from "react-icons/io5";
import { getCursos } from "../Curso/api/api";
import { getTurma } from "../Turma/api/api";
import { Curso as TipoCurso } from "../Curso/api/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "./FormCadSala/FormSchema";
import { notify } from "../../components/notify";
import { create } from "./api/api";

type FormData = z.infer<typeof FormSchema>;

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const { data: cursos, isLoading: loadingCursos } = useQuery({
    queryKey: ["lista-cursos", skip],
    queryFn: () => getCursos(skip),
  });
  
  const { data: turmas, isLoading: loadingTurmas } = useQuery({
    queryKey: ["lista-turmas", skip],
    queryFn: () => getTurma(skip),
  });


  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data: FormData) => await create(data),
    onSuccess: (response) => {
      if (response?.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["lista-salas"] });
        setShow(false);
        reset(), notify(response.data.message, "success");
      } else if (response?.status === 400) {
        setShow(false);
        reset(), notify(response.data.message, "warning");
      } else if (response?.status === 500) {
        setShow(false);
        reset(), notify(response.data.message, "error");
      }
    },
  });

  if (loadingCursos) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (loadingTurmas) {
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
          <form onSubmit={handleSubmit((data) => mutate(data))}>
            <Form.Label>Curso</Form.Label>
            <Form.Select aria-label="Nome do curso" className="mb-3" {...register("idCurso")}>
              {cursos.curso.map((index: TipoCurso) => (
                <option key={index.id}>{index.nome}</option>
              ))}
            </Form.Select>

            <Form.Label>Turma</Form.Label>
            <Form.Select aria-label="Turma" className="mb-3" {...register("idTurma")}>
              {turmas.turma.map((index: any) => (
                <option key={index.id}>{index.nome}</option>
              ))}
            </Form.Select>

            <Form.Label>Número da sala</Form.Label>
            <Form.Select aria-label="Número da sala" className="mb-3" {...register("numeroSala")}>
              {sala.map((index, qtd) => (
                <option key={index}>{qtd}</option>
              ))}
            </Form.Select>

            <Form.Label>Capacidade de alunos</Form.Label>
            <Form.Control type="number" maxLength={3} className="mb-3" {...register("capacidade")}/>
            {errors.capacidade && (
              <p className="m-0 pb-1 text-danger">{errors.capacidade.message}</p>
            )}

            <Form.Label>Tipo da Sala</Form.Label>
            <Form.Select aria-label="Tipo da sala" className="mb-3" {...register("case")}>
              <option value="lb-informatica">Laboratório de Informática</option>
              <option value="lb-farmacia">Laboratório de Farmácia</option>
            </Form.Select>

            <Form.Label>Case (armário)</Form.Label>
            <Form.Select aria-label="Tipo da sala" className="mb-3" {...register("comportaNotebook")}>
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
