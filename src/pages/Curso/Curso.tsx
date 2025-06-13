import Stack                from "react-bootstrap/Stack";
import Spinner              from "react-bootstrap/Spinner";
import { BuscarCurso }      from "./BuscarCurso";
import { Paginacao }        from "./Paginacao";
import { CardCurso }        from "./CardCurso";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getCursos }        from "./api/api";
import { useState }         from "react";
import { ModalCadastrarCurso }       from "./ModalCadastrarCurso";
import { Suspense, startTransition } from "react";
import { Curso as TipoCurso }        from "./api/types";

export const Curso = () => {
  const [skip, setSkip] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const { data, isPending } = useSuspenseQuery({
    queryKey: ["lista-cursos", skip],
    queryFn: async () => await getCursos(skip),
  });

  const qtdPageTotal: number = Math.ceil(data.count / 6);

  const nextPage = () => {
    startTransition(() => {
      setSkip((prev) => prev + 6);
    });
  };

  const backPage = () => {
    setSkip((prev) => (prev > 0 ? prev - 6 : 0));
  };

  const filterArray: Array<TipoCurso> = data.curso;

  const filter = search
    ? filterArray.filter((cursos) =>
        cursos.nome.toLowerCase().includes(search.toLowerCase())
      )
    : filterArray;

  return (
    <div className="container-lg">
      <Stack direction="horizontal" gap={3}>
        <div className="">
          <BuscarCurso search={search} setSearch={setSearch} />
        </div>
        <div className="lh-sm ms-auto mb-3">
          <ModalCadastrarCurso />
        </div>
      </Stack>

      <div
        className="overflow-x-auto d-flex gap-3 flex-column  flex-lg-row flex-sm-wrap justify-content-lg-center"
        style={{ height: "400px", overflowY: 'auto', }}
      >
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          {filter.length ? (
            filter.map((index: TipoCurso) => (
              <CardCurso key={index.id} dadosCurso={index} />
            ))
          ) : isPending ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <span>Nada a carregar...</span>
          )}
        </Suspense>

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
