import Card from "react-bootstrap/Card";
import { ModalAtualizarTurma } from "./ModalAtualizarTurma";
import { ModalExcluirTurma } from "./ModalExcluirTurma";

import { DadosTurma } from "./api/types";

export const CardTurma: React.FC<DadosTurma> = ({ dadosTurma }) => {
  return (
    <>
      <Card
        className="my-2 d-flex justify-content-center"
        style={{ width: "270px" }}
      >
        <Card.Img variant="top" src="/curso01.webp" />
        <Card.Body>
          <Card.Title className="d-flex gap-2 fw-normal">
            Curso:{" "}
            <span className="text-primary fw-semibold m-0">
              {dadosTurma.cursos.nome}
            </span>
          </Card.Title>
          <div>
            <div className="mb-1">
              Turma:{" "}
              <span className="text-primary fw-semibold">
                {dadosTurma.turma}
              </span>
            </div>
            <div className="mb-1">
              Data Início:{" "}
              <span className="text-primary fw-semibold">
                {dadosTurma.dataInicio}
              </span>
            </div>
            <div className="mb-1">
              Data Término:{" "}
              <span className="text-primary fw-semibold">
                {dadosTurma.dataFinal}
              </span>
            </div>
            <div className="mb-1">
              Entrada:{" "}
              <span className="text-primary fw-semibold">
                {dadosTurma.entrada}
              </span>
            </div>
            <div className="mb-1">
              Saída:{" "}
              <span className="text-primary fw-semibold">
                {dadosTurma.saida}
              </span>
            </div>
          </div>
          <div className="d-flex gap-4 justify-content-between">
            <ModalAtualizarTurma />
            <ModalExcluirTurma />
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
