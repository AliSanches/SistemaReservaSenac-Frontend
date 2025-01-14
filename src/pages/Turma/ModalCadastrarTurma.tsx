import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoAdd } from "react-icons/io5";
import { getCursos } from "../Curso/api/api";
import { useQuery } from "@tanstack/react-query";
import { Curso as TipoCurso } from "../Curso/api/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "./FormCadTurma/FormSchema";
import { create } from "./api/api";
import { notify } from "../../components/notify";

type FormData = z.infer<typeof FormSchema>;

export const ModalCadastrarTurma = () => {
  const [show, setShow] = useState(false);
  const skip = 0;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data: FormData) => await create(data),
    onSuccess: (response) => {
      if (response?.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["lista-turmas"] });
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const rows = [];

  for (let i = 1; i <= 300; i++) {
    rows.push(i);
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
          <Modal.Title>Cadastrar Turma</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit((data) => mutate(data))}>
            <Form.Label>Nome do curso</Form.Label>
            <Form.Select
              aria-label="Nome do curso"
              className="mb-3"
              {...register("idCurso")}
            >
              {data.curso.map((indice: TipoCurso) => {
                return (
                  <option key={indice.id} value={indice.id}>
                    {indice.nome}
                  </option>
                );
              })}
              {/* {errors.idCurso && (
                <p className="m-0 pb-1 text-danger">{errors.idCurso.message}</p>
              )} */}
            </Form.Select>

            <Form.Label>Número da turma</Form.Label>
            <Form.Select
              aria-label="Número da turma"
              className="mb-3"
              {...register("turma")}
            >
              {rows.map((index, qtd) => (
                <option key={index}>{qtd}</option>
              ))}
              {/* {errors.turma && (
                <p className="m-0 pb-1 text-danger">{errors.turma.message}</p>
              )} */}
            </Form.Select>

            <Form.Label>Data Início</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              {...register("dataInicio")}
            />

            <Form.Label>Data Término</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              {...register("dataFinal")}
            />

            <Form.Label>Hora Início</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="00:00:00"
              {...register("entrada")}
            />
            {errors.entrada && (
              <p className="m-0 pb-1 text-danger">{errors.entrada.message}</p>
            )}

            <Form.Label>Hora Término</Form.Label>
            <Form.Control
              type="text"
              className="mb-3"
              placeholder="00:00:00"
              {...register("saida")}
            />
            {errors.saida && (
              <p className="m-0 pb-1 text-danger">{errors.saida.message}</p>
            )}

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
