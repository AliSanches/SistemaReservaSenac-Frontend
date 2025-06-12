import Stack from "react-bootstrap/Stack";
import { BuscarReservas } from "./BuscarReservas";
import { ModalCadastrarReserva } from "./ModalCadastrarReserva";
import { Paginacao } from "./Paginacao";


export const Reservas = () => {
  return (
    <section className="container-lg">
      <Stack direction="horizontal" gap={3}>
        <div className="">
          <BuscarReservas />
        </div>
        <div className="lh-sm ms-auto mb-3">
          <ModalCadastrarReserva />
        </div>
      </Stack>

      <div
        className="overflow-x-auto d-flex gap-3 flex-column"
        style={{ height: "400px" }}
      >
  
      </div>
      <Paginacao />
    </section>
  );
};
