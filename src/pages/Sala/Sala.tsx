import Stack                  from "react-bootstrap/Stack";
import Spinner                from "react-bootstrap/Spinner";
import { Suspense, startTransition }  from "react";
import { useState }           from "react";
import { BuscarSala }         from "./BuscarSala";
import { ModalCadastrarSala } from "./ModalCadastrarSala";
import { Paginacao }          from "./Paginacao";
import { useSuspenseQuery }   from "@tanstack/react-query";
import { getSala }            from "./api/api";
import { Sala as TipoSala }   from "./api/types";
import { CardSala }           from "./CardSala";

export const Sala = () => {
  const [skip, setSkip] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const { data, isPending } = useSuspenseQuery({
    queryKey: ["lista-salas"],
    queryFn: async () => await getSala(skip),
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

  const filterArray: Array<TipoSala> = data.sala;

  const filter = search
    ? filterArray
      .filter((salas) => salas.numeroSala)
      .filter((salas) =>
        String(salas.numeroSala).toLowerCase().includes(search.toLowerCase())
      )
    : filterArray;

  return (
    <div className="container-lg">
      <Stack direction="horizontal" gap={3}>
        <div className="">
          <BuscarSala search={search} setSearch={setSearch}/>
        </div>
        <div className="lh-sm ms-auto mb-3">
          <ModalCadastrarSala />
        </div>
      </Stack>

      <div
        className="overflow-x-auto d-flex gap-3 flex-column  flex-lg-row flex-sm-wrap justify-content-lg-center"
        style={{ height: "auto" }}
      >
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          {filter.length ? (
            filter.map((index: TipoSala) => (
              <CardSala key={index.id} dadosSala={index} />
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
