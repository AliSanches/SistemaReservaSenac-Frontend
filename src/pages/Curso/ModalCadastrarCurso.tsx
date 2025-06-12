import { useState } from "react";

import Stack from 'react-bootstrap/Stack';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import { IoAdd } from "react-icons/io5";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { create } from "./api/api";
import { notify } from "../../components/notify";
import { categorias } from "./constantes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "./FormCurso/FormShema";

type FormData = z.infer<typeof FormSchema>;

export const ModalCadastrarCurso: React.FC = () => {
  const queryClient = useQueryClient();  
  const [show, setShow] = useState<boolean>(false);
  const [imagem, setImagem] = useState<File | undefined >(undefined);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImagem(event.target.files?.[0]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate } = useMutation({
    mutationFn: async ({ data, imagem }: { data: FormData; imagem: File }) => await create(data, imagem),
    onSuccess: (response) => {
      if (response?.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["lista-cursos"] });
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

  const onSubmit = (data: FormData) => {
    if (!imagem) {
      notify("Imagem é obrigatória", "warning");
    return;
    }

    mutate({ data, imagem });
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <FloatingLabel
                controlId="floatingInput"
                label="Nome do curso"
                className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="curso"
                {...register("nome")}
              />
              {errors.nome && (
                  <p className="m-0 py-1 text-danger">{errors.nome.message}</p>
                )}
            </FloatingLabel>

            <Form.Label>Tipo do curso</Form.Label>
            <Form.Select
              aria-label="Selecione o tipo do curso"
              required
              className="mb-3"
              {...register("categoria")}
            >
              {categorias.map((index, indice) => (
                <option key={indice} value={index}>
                  {index}
                </option>
              ))}
            </Form.Select>
            {errors.categoria && (
              <p className="m-0 py-1 text-danger">{errors.categoria.message}</p>
            )}

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Imagem do curso</Form.Label>
              <Form.Control type="file" onChange={handleFileChange}/>
            </Form.Group>

             <Stack direction="horizontal" gap={5}>
              <Button variant="secondary" onClick={handleClose}>
                Voltar
              </Button>
              <Button variant="primary" type="submit">
                Cadastrar
              </Button>
             </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
