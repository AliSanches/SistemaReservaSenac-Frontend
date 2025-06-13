import Modal           from "react-bootstrap/Modal";
import Button          from "react-bootstrap/Button";
import Form            from "react-bootstrap/Form";
import Spinner         from "react-bootstrap/Spinner";
import { getCursos }   from "../Curso/api/api";
import { useForm }     from "react-hook-form";
import { z }           from "zod";
import { FormSchema }  from "./FormCadSala/FormSchema";
import { notify }      from "../../components/notify";
import { update }      from "./api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { getTurmaRefCurso }    from "./api/api";
import { Curso as TipoCurso }  from "../Curso/api/types";
import { DadosSala }           from "./api/types";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type FormData = z.infer<typeof FormSchema>;

export const ModalAtualizarSala: React.FC<DadosSala> = ({ dadosSala }) => {
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
    resolver: zodResolver(FormSchema)
  });
  
  const verificaTurma = async (id: number) => {
    const res = await getTurmaRefCurso(id);
    setTurmas(res.turma);
  };

  const verificaTurmaChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(event.target.value);
    const res = await getTurmaRefCurso(id);
    setTurmas(res.turma);
  };

  useEffect(() => {
    let id = Number(dadosSala.idCurso);
    verificaTurma(id);
  },[]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data: FormData) => await update(dadosSala.id, data),
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

  const { data: cursos, isLoading: loadingCursos } = useQuery({
    queryKey: ["lista-cursos", skip],
    queryFn: () => getCursos(skip),
  });

  if (loadingCursos) {
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
          <Modal.Title>Atualizar Sala</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit((data) => mutate(data))}>
            <Form.Label>Curso</Form.Label>
              <Form.Select aria-label="Nome do curso" className="mb-3" 
              {...register("idCurso")}
              onChange={verificaTurmaChange}
              defaultValue={dadosSala.idCurso}
              >
                <option>Selecione um curso</option>
                {cursos.curso.map((indice: TipoCurso) => {
                return (
                  <option key={indice.id} value={indice.id}>
                    {indice.nome}
                  </option>
                );
              })}
              </Form.Select>

              <Form.Label>Turma</Form.Label>
              <Form.Select aria-label="Turma" className="mb-3" 
              {...register("idTurma")}
              >
                {turmas.map((index: any) => (
                  <option key={index.id} value={index.id}>
                    {index.turma}
                  </option>
                ))}
              </Form.Select>

              <Form.Label>Número da sala</Form.Label>
              <Form.Select aria-label="Número da sala" className="mb-3" 
              {...register("numeroSala")}
              defaultValue={dadosSala.numeroSala}
              >
                {sala.map((index, qtd) => (
                  <option key={index}>{qtd}</option>
                ))}
              </Form.Select>

              <Form.Label>Capacidade de alunos</Form.Label>
              <Form.Control type="number" className="mb-3" {...register("capacidade")} defaultValue={dadosSala.capacidade}/>
              {errors.capacidade && (
                <p className="m-0 pb-1 text-danger">{errors.capacidade.message}</p>
              )}

              <Form.Label>Tipo da Sala</Form.Label>
              <Form.Select aria-label="Tipo da sala" className="mb-3" {...register("tipoSala")} defaultValue={dadosSala.tipoSala}>
                <option value="Laboratório de Informática">Laboratório de Informática</option>
                <option value="Laboratório de Farmácia">Laboratório de Farmácia</option>
              </Form.Select>

              <Form.Label>Case (armário)</Form.Label>
              <Form.Select aria-label="Armario" className="mb-3" {...register("caseArmario")} defaultValue={dadosSala.caseArmario}>
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </Form.Select>

              <Form.Label>Comporta Notebook</Form.Label>
              <Form.Select aria-label="Notebook" className="mb-3" {...register("comportaNotebook")} defaultValue={dadosSala.comportaNotebook}>
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
