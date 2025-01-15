import Stack from "react-bootstrap/Stack";
import Spinner from "react-bootstrap/Spinner";

import { BuscarTurma } from "./BuscarTurma";
import { ModalCadastrarTurma } from "./ModalCadastrarTurma";
import { Paginacao } from "./Paginacao";
import { startTransition } from "react";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getTurma } from "./api/api";
import { CardTurma } from "./CardTurma";
import { Turma as TipoTurma } from "./api/types";

export const Turma = () => {
  const [skip, setSkip] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const { data, isPending, isLoading } = useQuery({
    queryKey: ["lista-turmas", skip],
    queryFn: () => getTurma(skip),
  });

  if (isLoading) {
    return <Spinner animation="border" variant="primary" />;
  }

  const qtdPageTotal: number = Math.ceil(data.count / 6);

  const nextPage = () => {
    startTransition(() => {
      setSkip((prev) => prev + 6);
    });
  };

  const backPage = () => {
    setSkip((prev) => (prev > 0 ? prev - 6 : 0));
  };

  const filterArray: Array<TipoTurma> = data.turma;

  const filter = search
    ? filterArray
        .filter((turmas) => turmas.turma)
        .filter((turmas) =>
          String(turmas.turma).toLowerCase().includes(search.toLowerCase())
        )
    : filterArray;

  return (
    <div className="container-lg">
      <Stack direction="horizontal" gap={3}>
        <div className="">
          <BuscarTurma search={search} setSearch={setSearch} />
        </div>
        <div className="lh-sm ms-auto mb-3">
          <ModalCadastrarTurma />
        </div>
      </Stack>

      <div
        className="overflow-x-auto d-flex gap-3 flex-column  flex-lg-row flex-sm-wrap justify-content-lg-center"
        style={{ height: "auto" }}
      >
        {isPending ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : filter ? (
          filter.map((index: TipoTurma) => (
            <CardTurma key={index.id} dadosTurma={index} />
          ))
        ) : (
          <Spinner animation="border" variant="primary" />
        )}

        <Paginacao
          nextPage={nextPage}
          backPage={backPage}
          totalPages={qtdPageTotal}
          skip={skip}
        />
      </div>
    </div>
  );
};
