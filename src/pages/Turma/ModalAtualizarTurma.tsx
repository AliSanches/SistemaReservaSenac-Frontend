import { useState }    from "react";
import Modal           from "react-bootstrap/Modal";
import Button          from "react-bootstrap/Button";
import Form            from "react-bootstrap/Form";
import { DadosTurma }  from "./api/types";
import Spinner         from "react-bootstrap/Spinner";
import { getCursos }   from "../Curso/api/api";
import { useForm }     from "react-hook-form";
import { z }           from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema }  from "./FormCadTurma/FormSchema";
import { notify }      from "../../components/notify";
import { update }      from "./api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Curso as TipoCurso }                    from "../Curso/api/types";

type FormData = z.infer<typeof FormSchema>;

export const ModalAtualizarTurma: React.FC<DadosTurma> = ({ dadosTurma }) => {
  const [show, setShow] = useState(false);
  const skip = 0;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const rows = [];

  for (let i = 0; i <= 500; i++) {
    rows.push(i);
  }

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
    mutationFn: async (data: FormData) => await update(dadosTurma.id, data),
    onSuccess: (response) => {
      if (response?.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["lista-turmas"] });
        queryClient.invalidateQueries({ queryKey: ["lista-cursos"] });
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

  const { data, isLoading } = useQuery({
    queryKey: ["lista-cursos", skip],
    queryFn: () => getCursos(skip),
  });

  if (isLoading) {
    return <Spinner animation="border" variant="primary" />;
  }
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
          <Modal.Title>Atualizar Turma</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit((data) => mutate(data))}>
            <Form.Label>Nome do curso</Form.Label>
            <Form.Select
              aria-label="Nome do curso"
              className="mb-3"
              {...register("idCurso")}
              defaultValue={dadosTurma.idCurso}
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
              {...register("turma")}
              defaultValue={dadosTurma.turma}
            >
              {rows.map((index, qtd) => (
                <option key={index}>{qtd}</option>
              ))}
            </Form.Select>

            <Form.Label>Data Início</Form.Label>
            <Form.Control
              type="date"
              className="mb-3"
              {...register("dataInicio")}
              defaultValue={dadosTurma.dataInicio}
            />

            <Form.Label>Data Término</Form.Label>
            <Form.Control
              type="date"
              className="mb-3"
              {...register("dataFinal")}
              defaultValue={dadosTurma.dataFinal}
            />

            <Form.Label>Hora Início</Form.Label>
            <Form.Control
              type="time"
              className="mb-3"
              {...register("entrada")}
              defaultValue={dadosTurma.entrada}
            />
            {errors.entrada && (
              <p className="m-0 pb-1 text-danger">{errors.entrada.message}</p>
            )}

            <Form.Label>Hora Término</Form.Label>
            <Form.Control
              type="time"
              className="mb-3"
              {...register("saida")}
              defaultValue={dadosTurma.saida}
            />
            {errors.saida && (
              <p className="m-0 pb-1 text-danger">{errors.saida.message}</p>
            )}

            <div className="d-flex justify-content-end gap-4">
              <Button variant="secondary" onClick={handleClose}>
                Voltar
              </Button>
              <Button type="submit" variant="primary">
                Atualizar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
