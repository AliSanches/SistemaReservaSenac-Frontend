import { useState }     from "react";
import Spinner          from "react-bootstrap/Spinner";
import Modal            from "react-bootstrap/Modal";
import Button           from "react-bootstrap/Button";
import Form             from "react-bootstrap/Form";
import { useForm }      from "react-hook-form";
import { z }            from "zod";
import { zodResolver }  from "@hookform/resolvers/zod";
import { FormSchema }   from "./FormCadReserva/FormSchema";
import { notify }       from "../../components/notify";
import { update }       from "./api/api";
import { getSala }      from "../Sala/api/api";
import { getCursos }    from "../Curso/api/api";
import { getTurma }     from "../Turma/api/api";
import { DadosReserva } from "./api/types";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

type FormData = z.infer<typeof FormSchema>;

export const ModalAtualizarReserva: React.FC<DadosReserva> = ({ dadosReserva })=> {
  const [show, setShow] = useState(false);
  const skip = 0;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({resolver: zodResolver(FormSchema)});

  const { data: salas, isLoading: loadingSalas } = useQuery({
    queryKey: ["lista-salas", skip],
    queryFn: () => getSala(skip),
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
    mutationFn: async (data: FormData) => await update(dadosReserva.id, data),
    onSuccess: (response) => {
      if (response?.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["lista-reserva"] });
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

  if (loadingSalas) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (loadingCursos) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (loadingTurmas) {
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
          <Modal.Title>Atualizar Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit((data) => mutate(data))}>
          <Form.Label>Sala</Form.Label>
            <Form.Select aria-label="Selecione a sala" className="mb-3" {...register("sala")}>
              {salas.sala.map((index: any) => (
                <option key={index.id}>{index.nome}</option>
              ))}
            </Form.Select>

            <Form.Label>Curso</Form.Label>
            <Form.Select aria-label="Selecione o curso" className="mb-3" {...register("idCurso")}>
              {cursos.curso.map((index: any) => (
                <option key={index.id}>{index.nome}</option>
              ))}
            </Form.Select>

            <Form.Label>Turma</Form.Label>
            <Form.Select aria-label="Selecione a turma" className="mb-3" {...register("idTurma")}>
              {turmas.turma.map((index: any) => (
                <option key={index.id}>{index.nome}</option>
              ))}
            </Form.Select>

            <Form.Label>Reserva Início</Form.Label>
            <Form.Control type="date" className="mb-3" {...register("dataInicio")}/>
            {errors.dataInicio && (
              <p className="m-0 pb-1 text-danger">{errors.dataInicio.message}</p>
            )}

            <Form.Label>Reserva Término</Form.Label>
            <Form.Control type="date" className="mb-3" {...register("dataTermino")}/>
            {errors.dataTermino && (
              <p className="m-0 pb-1 text-danger">{errors.dataTermino.message}</p>
            )}

            <Form.Label>Hora Início</Form.Label>
            <Form.Control type="text" className="mb-3" placeholder="00:00" {...register("horaInicio")}/>
            {errors.horaInicio && (
              <p className="m-0 pb-1 text-danger">{errors.horaInicio.message}</p>
            )}

            <Form.Label>Hora Término</Form.Label>
            <Form.Control type="text" className="mb-3" placeholder="00:00" {...register("horaTermino")}/>
            {errors.horaTermino && (
              <p className="m-0 pb-1 text-danger">{errors.horaTermino.message}</p>
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
