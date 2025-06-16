import Modal           from "react-bootstrap/Modal";
import Button          from "react-bootstrap/Button";
import Form            from "react-bootstrap/Form";
import Spinner         from "react-bootstrap/Spinner";
import { useState }    from "react";
import { IoAdd }       from "react-icons/io5";
import { getCursos }   from "../Curso/api/api";
import { useForm }     from "react-hook-form";
import { z }           from "zod";
import { FormSchema }  from "./FormCadSala/FormSchema";
import { notify }      from "../../components/notify";
import { create }      from "./api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { getTurmaRefCurso }   from "./api/api";
import { Curso as TipoCurso } from "../Curso/api/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type FormData = z.infer<typeof FormSchema>;

export const ModalCadastrarSala = () => {
  const [show, setShow] = useState<boolean>(false);
  const skip = 0;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [turmas, setTurmas] = useState([]);

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
  
  const verificaTurma = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(event.target.value);
    const res = await getTurmaRefCurso(id);
    setTurmas(res.turma);
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data: FormData) => await create(data),
    onSuccess: (response) => {
      if (response?.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["lista-salas"] });
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
  });

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
          <Modal.Title>Cadastrar Sala</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit((data) => mutate(data))}>
            <Form.Label>Curso</Form.Label>
            <Form.Select aria-label="Nome do curso" className="mb-3" {...register("idCurso")} onChange={verificaTurma}>
              <option>Selecione um curso</option>
              {cursos.curso.map((index: TipoCurso) => (
                <option key={index.id} value={index.id}>{index.nome}</option>
              ))}
            </Form.Select>

            <Form.Label>Turma</Form.Label>
            <Form.Select aria-label="Turma" className="mb-3" {...register("idTurma")}>
              <option >Selecione uma turma</option>
              {turmas.map((index: any) => (
                <option key={index.id} value={index.id}>
                  {index.turma}
                </option>
              ))}
            </Form.Select>

            <Form.Label>Número da sala</Form.Label>
            <Form.Select aria-label="Número da sala" className="mb-3" {...register("numeroSala")}>
              {sala.map((index, qtd) => (
                <option key={index}>{qtd}</option>
              ))}
            </Form.Select>

            <Form.Label>Capacidade de alunos</Form.Label>
            <Form.Control type="number" className="mb-3" {...register("capacidade")}/>
            {errors.capacidade && (
              <p className="m-0 pb-1 text-danger">{errors.capacidade.message}</p>
            )}

            <Form.Label>Tipo da Sala</Form.Label>
            <Form.Select aria-label="Tipo da sala" className="mb-3" {...register("tipoSala")}>
              <option value="Laboratório de Informática">Laboratório de Informática</option>
              <option value="Laboratório de Farmácia">Laboratório de Farmácia</option>
            </Form.Select>

            <Form.Label>Case (armário)</Form.Label>
            <Form.Select aria-label="Armario" className="mb-3" {...register("caseArmario")}>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </Form.Select>

            <Form.Label>Comporta Notebook</Form.Label>
            <Form.Select aria-label="Notebook" className="mb-3" {...register("comportaNotebook")}>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
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
