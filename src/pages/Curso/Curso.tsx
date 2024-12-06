import Stack from "react-bootstrap/Stack";
import Spinner from "react-bootstrap/Spinner";

import { BuscarCurso } from "./BuscarCurso";
import { ModalCadastrarCurso } from "./ModalCadastrarCurso";
import { Paginacao } from "./Paginacao";
import { CardCurso } from "./CardCurso";

import { useQuery } from "@tanstack/react-query";

import { getCursos } from "./api/api";

import { Curso as TipoCurso } from "./api/types";

export const Curso = () => {
  const { data, isPending } = useQuery({
    queryKey: ["cursos"],
    queryFn: getCursos,
  });

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
        className="overflow-x-auto d-flex gap-3 flex-column  flex-lg-row flex-sm-wrap justify-content-lg-center"
        style={{ height: "400px" }}
      >
        {data ? (
          data.map((index: TipoCurso) => (
            <CardCurso key={index.id} dadosCurso={index} />
          ))
        ) : isPending ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <span>Nada a carregar...</span>
        )}
      </div>

      <Paginacao />
    </div>
  );
};
