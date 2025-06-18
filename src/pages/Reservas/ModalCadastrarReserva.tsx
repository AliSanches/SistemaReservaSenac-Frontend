import { useState }    from "react";
import Spinner         from "react-bootstrap/Spinner";
import Modal           from "react-bootstrap/Modal";
import Button          from "react-bootstrap/Button";
import Form            from "react-bootstrap/Form";
import { IoAdd }       from "react-icons/io5";
import { useForm }     from "react-hook-form";
import { z }           from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema }  from "./FormCadReserva/FormSchema";
import { notify }      from "../../components/notify";
import { getSala }     from "../Sala/api/api";
import { getCursos }   from "../Curso/api/api";
import { getTurmaRefCurso }    from "../Sala/api/api";
import { create, getInfTurma } from "./api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type FormData = z.infer<typeof FormSchema>;

export const ModalCadastrarReserva = () => {
  const [show, setShow] = useState(false);
  const [turmas, setTurmas] = useState([]);
  const [inicio, setInicio] = useState('');
  const [final, setFinal] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFinal, setDataFinal] = useState([]);
  const skip = 0;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({resolver: zodResolver(FormSchema)});

  const verificaTurma = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(event.target.value);
    const res = await getTurmaRefCurso(id);
    setTurmas(res.turma);
  };

  const verificaInfTurma = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(event.target.value);
    const res = await getInfTurma(id);
    setInicio(res.entrada);
    setFinal(res.saida);
    setDataInicio(res.dataInicio);
    setDataFinal(res.dataFinal);
  };

  const { data: salas, isLoading: loadingSalas } = useQuery({
    queryKey: ["lista-salas", skip],
    queryFn: () => getSala(skip),
  });

  const { data: cursos, isLoading: loadingCursos } = useQuery({
    queryKey: ["lista-cursos", skip],
    queryFn: () => getCursos(skip),
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data: FormData) => await create(data),
    onSuccess: (response) => {
      if (response?.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["lista-reserva"] });
        setShow(false);
        notify(response.data.message, "success");
      } else if (response?.status === 400) {
        setShow(false);
        notify(response.data.message, "warning");
      } else if (response?.status === 500) {
        setShow(false);
        notify(response.data.message, "error");
      }
      reset();  
    },
    onError: (error: any) => {
      const status = error.response?.status;
      const message = error.response?.data?.message;

        setShow(false);
  
      if (status === 400) {
        notify(message, "warning");
      } else {
        notify(message, "error");
      }
      reset();  
    }
  });

  if (loadingSalas) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (loadingCursos) {
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
          <Modal.Title>Cadastrar Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit((data) => mutate(data))}>
            <Form.Label>Sala</Form.Label>
            <Form.Select aria-label="Selecione a sala" className="mb-3" {...register("idSala")}>
              <option>Selecione uma sala</option>
              {salas.sala.map((index: any) => (
                <option key={index.id} value={index.id}>{index.numeroSala}</option>
              ))}
            </Form.Select>

            <Form.Label>Curso</Form.Label>
            <Form.Select aria-label="Selecione o curso" className="mb-3" {...register("idCurso")} onChange={verificaTurma}>
              <option>Selecione um curso</option>
              {cursos.curso.map((index: any) => (
                <option key={index.id} value={index.id}>{index.nome}</option>
              ))}
            </Form.Select>

            <Form.Label>Turma</Form.Label>
            <Form.Select aria-label="Selecione a turma" className="mb-3" {...register("idTurma")} onChange={verificaInfTurma}>
              <option>Selecione uma turma</option>
              {turmas.map((index: any) => (
                <option key={index.id} value={index.id}>{index.turma}</option>
              ))}
            </Form.Select>

            <Form.Label>Reserva Início</Form.Label>
            <Form.Control type="date" className="mb-3" defaultValue={dataInicio} {...register("dataInicio")}/>
            {errors.dataInicio && (
              <p className="m-0 pb-1 text-danger">{errors.dataInicio.message}</p>
            )}

            <Form.Label>Reserva Término</Form.Label>
            <Form.Control type="date" className="mb-3" defaultValue={dataFinal} {...register("dataTermino")}/>
            {errors.dataTermino && (
              <p className="m-0 pb-1 text-danger">{errors.dataTermino.message}</p>
            )}

            <Form.Label>Hora Início</Form.Label>
            <Form.Control type="time" className="mb-3" defaultValue={inicio} {...register("horaInicio")}/>
            {errors.horaInicio && (
              <p className="m-0 pb-1 text-danger">{errors.horaInicio.message}</p>
            )}

            <Form.Label>Hora Término</Form.Label>
            <Form.Control type="time" className="mb-3" defaultValue={final} {...register("horaTermino")}/>
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
