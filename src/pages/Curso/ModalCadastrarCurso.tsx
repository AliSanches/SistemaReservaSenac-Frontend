import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import { IoAdd } from "react-icons/io5";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { create, uploadFile } from "./api/api";
import { notify } from "../../components/notify";
import { categorias } from "./constantes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "./FormCurso/FormShema";

type FormData = z.infer<typeof FormSchema>;

export const ModalCadastrarCurso: React.FC = () => {  
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nome, setNome] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");
  const [imagem, setImagem] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const data = {
    nome: nome,
    categoria: categoria,
  };

  const queryClient = useQueryClient();

  const { mutate: upload} = useMutation({
    mutationFn: async () => await uploadFile(imagem),
  });

  const { mutate } = useMutation({
    mutationFn: async () => await create(data),
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

  const Data = () => {
    mutate();
    upload();
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
          <Modal.Title>Cadastrar Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(Data)}>
            <FloatingLabel
                controlId="floatingInput"
                label="Nome do curso"
                className="mb-3"
            >
              <Form.Control
                  type="text"
                  placeholder="curso"
                  {...register("curso")}
              />
              {errors.curso && (
                  <p className="m-0 py-1 text-danger">{errors.curso.message}</p>
                )}
            </FloatingLabel>

            <Form.Label>Tipo do curso</Form.Label>
            <Form.Select
              aria-label="Selecione o tipo do curso"
              onChange={(e) => setCategoria(e.target.value)}
              required
              className="mb-3"
            >
              {categorias.map((index, indice) => (
                <option key={indice} value={index}>
                  {index}
                </option>
              ))}
            </Form.Select>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Imagem do curso</Form.Label>
              <Form.Control type="file" onChange={(e) => setImagem(e.target.files[0])}/>
            </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Voltar
          </Button>
          <Button variant="primary" type="submit" onClick={Data}>
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
