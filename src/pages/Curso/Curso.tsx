import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";

import { BuscarCurso } from "./BuscarCurso";
import { ModalCadastrarCurso } from "./ModalCadastrarCurso";
import { ModalAtualizarCurso } from "./ModalAtualizarCurso";
import { ModalExcluirCurso } from "./ModalExcluirCurso";
import { Paginacao } from "./Paginacao";

export const Curso = () => {
  return (
    <div className="container-lg">
      <Stack direction="horizontal" gap={3}>
        <div className="">
          <BuscarCurso />
        </div>
        <div className="lh-sm ms-auto mb-3">
          <ModalCadastrarCurso />
        </div>
      </Stack>

      <div
        className="overflow-x-auto d-flex gap-3 flex-column"
        style={{ height: "400px" }}
      >
        <Card
          className="my-2 d-flex justify-content-center"
          style={{ width: "270px" }}
        >
          <Card.Img variant="top" src="/curso01.webp" />
          <Card.Body>
            <Card.Title className="d-flex gap-2 fw-normal">
              Curso: <p className="text-primary m-0">Administração</p>
            </Card.Title>
            <Card.Text>
              <span
                className="text-white d-flex gap-2 px-2 py-1 bg-primary rounded-3"
                style={{ width: "120px" }}
              >
                Graduação
              </span>
            </Card.Text>
            <div className="d-flex gap-4 justify-content-between">
              <ModalAtualizarCurso />
              <ModalExcluirCurso />
            </div>
          </Card.Body>
        </Card>
      </div>

      <Paginacao />
    </div>
  );
};
