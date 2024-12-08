import Card from "react-bootstrap/Card";

import { ModalAtualizarCurso } from "./ModalAtualizarCurso";
import { ModalExcluirCurso } from "./ModalExcluirCurso";

import { DadosCurso } from "./api/types";

export const CardCurso: React.FC<DadosCurso> = ({ dadosCurso }) => {
  return (
    <>
      <Card
        className="my-2 d-flex justify-content-center shadow"
        style={{ width: "270px", height: "300px" }}
      >
        <Card.Img variant="top" src="/curso01.webp" />
        <Card.Body>
          <Card.Title className="d-flex gap-2 fw-normal">
            Curso: <p className="text-primary m-0">{dadosCurso.nome}</p>
          </Card.Title>
          <Card.Text style={{ height: "30px" }}>
            <span
              className="text-white d-flex gap-2 px-2 py-1 bg-primary rounded-3"
              style={{ width: "170px" }}
            >
              {dadosCurso.categoria}
            </span>
          </Card.Text>
          <div className="d-flex gap-4 justify-content-between">
            <ModalAtualizarCurso dadosCurso={dadosCurso} />
            <ModalExcluirCurso />
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
