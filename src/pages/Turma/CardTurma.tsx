import Card                    from "react-bootstrap/Card";
import { ModalAtualizarTurma } from "./ModalAtualizarTurma";
import { ModalExcluirTurma }   from "./ModalExcluirTurma";

import { DadosTurma } from "./api/types";

export const CardTurma: React.FC<DadosTurma> = ({ dadosTurma }) => {
  const imagemUrl = `${import.meta.env.VITE_API_URL}/uploads/${dadosTurma.cursos.arquivo}`;
  return (
    <>
      <Card
        className="my-2 d-flex justify-content-center"
        style={{
          width: '270px',
          backgroundImage: `url(${imagemUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Card.Body>
          <Card.Title className="d-flex gap-2 fw-normal text-white">
            Curso:{" "}
            <span className="text-primary fw-semibold m-0">
              {dadosTurma.cursos.nome}
            </span>
          </Card.Title>
          <div>
            <div className="mb-1 text-white">
              Turma:{" "}
              <span className="text-primary fw-semibold">
                {dadosTurma.turma}
              </span>
            </div>
            <div className="mb-1 text-white">
              Data Início:{" "}
              <span className="text-primary fw-semibold">
                {dadosTurma.dataInicio}
              </span>
            </div>
            <div className="mb-1 text-white">
              Data Término:{" "}
              <span className="text-primary fw-semibold">
                {dadosTurma.dataFinal}
              </span>
            </div>
            <div className="mb-1 text-white">
              Entrada:{" "}
              <span className="text-primary fw-semibold">
                {dadosTurma.entrada}
              </span>
            </div>
            <div className="mb-1 text-white">
              Saída:{" "}
              <span className="text-primary fw-semibold">
                {dadosTurma.saida}
              </span>
            </div>
          </div>
          <div className="d-flex gap-4 justify-content-between">
            <ModalAtualizarTurma dadosTurma={dadosTurma} />
            <ModalExcluirTurma dadosTurma={dadosTurma} />
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
