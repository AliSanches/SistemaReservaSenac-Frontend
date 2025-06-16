import Stack                from "react-bootstrap/Stack";
import { BuscarReservas }   from "./BuscarReservas";
import { Paginacao }        from "./Paginacao";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getReserva }       from "./api/api";
import { useState }         from "react";
import Spinner              from "react-bootstrap/Spinner";
import { CardReserva }      from "./CardReserva";
import { Suspense, startTransition }  from "react";
import { ModalCadastrarReserva }      from "./ModalCadastrarReserva";
import { Reserva as TipoReserva }     from "./api/types";


export const Reservas = () => {
  const [skip, setSkip] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const { data, isPending } = useSuspenseQuery({
    queryKey: ["lista-reservas", skip],
    queryFn: async () => await getReserva(skip),
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

  const filterArray: Array<TipoReserva> = data.reserva;

  const filter = search
    ? filterArray.filter((reserva) =>
        reserva.dataInicio.toLowerCase().includes(search.toLowerCase())
      )
    : filterArray;

  return (
    <section className="container-lg">
      <Stack direction="horizontal" gap={3}>
        <div className="">
          <BuscarReservas search={search} setSearch={setSearch} />
        </div>
        <div className="lh-sm ms-auto mb-3">
          <ModalCadastrarReserva />
        </div>
      </Stack>

      <div
        className="overflow-x-auto d-flex gap-3 flex-column  flex-lg-row flex-sm-wrap justify-content-lg-center"
        style={{ height: "400px", overflowY: 'auto', }}
      >
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          {filter?.length ? (
            filter.map((index: TipoReserva) => (
              <CardReserva key={index.id} dadosReserva={index} />
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
    </section>
  );
};
