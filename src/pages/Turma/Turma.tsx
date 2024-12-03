import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";

import { BuscarTurma } from "./BuscarTurma";
import { ModalCadastrarTurma } from "./ModalCadastrarTurma";
import { ModalAtualizarTurma } from "./ModalAtualizarTurma";
import { ModalExcluirTurma } from "./ModalExcluirTurma";
import { Paginacao } from "./Paginacao";

export const Turma = () => {
  return (
    <div className="container-lg">
      <Stack direction="horizontal" gap={3}>
        <div className="">
          <BuscarTurma />
        </div>
        <div className="lh-sm ms-auto mb-3">
          <ModalCadastrarTurma />
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
              Curso:{" "}
              <span className="text-primary fw-semibold m-0">
                Administração
              </span>
            </Card.Title>
            <div>
              <div className="mb-1">
                Número da turma:{" "}
                <span className="text-primary fw-semibold">10</span>
              </div>
              <div className="mb-1">
                Data Início:{" "}
                <span className="text-primary fw-semibold">10/01/2025</span>
              </div>
              <div className="mb-1">
                Data Término:{" "}
                <span className="text-primary fw-semibold">30/12/2025</span>
              </div>
              <div className="mb-1">
                Hora Início:{" "}
                <span className="text-primary fw-semibold">13:00H</span>
              </div>
              <div className="mb-1">
                Hora Término:{" "}
                <span className="text-primary fw-semibold">17:30H</span>
              </div>
            </div>
            <div className="d-flex gap-4 justify-content-between">
              <ModalAtualizarTurma />
              <ModalExcluirTurma />
            </div>
          </Card.Body>
        </Card>
      </div>
      <Paginacao />
    </div>
  );
};
