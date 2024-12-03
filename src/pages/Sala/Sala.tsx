import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";

import { BuscarSala } from "./BuscarSala";
import { ModalCadastrarSala } from "./ModalCadastrarSala";
import { ModalAtualizarSala } from "./ModalAtualizarSala";
import { ModalExcluirSala } from "./ModalExcluirSala";
import { Paginacao } from "./Paginacao";

export const Sala = () => {
  return (
    <div className="container-lg">
      <Stack direction="horizontal" gap={3}>
        <div className="">
          <BuscarSala />
        </div>
        <div className="lh-sm ms-auto mb-3">
          <ModalCadastrarSala />
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
                Número da sala:{" "}
                <span className="text-primary fw-semibold">401</span>
              </div>
              <div className="mb-1">
                Capacidade de Alunos:{" "}
                <span className="text-primary fw-semibold">30</span>
              </div>
              <div className="mb-1">
                Tipo da Sala:{" "}
                <span className="text-primary fw-semibold">Informatica</span>
              </div>
              <div className="mb-1">
                Case (armário):{" "}
                <span className="text-primary fw-semibold">Sim</span>
              </div>
              <div className="mb-1">
                Comporta Notebook:{" "}
                <span className="text-primary fw-semibold">Não</span>
              </div>
            </div>
            <div className="d-flex gap-4 justify-content-between">
              <ModalAtualizarSala />
              <ModalExcluirSala />
            </div>
          </Card.Body>
        </Card>
      </div>
      <Paginacao />
    </div>
  );
};
