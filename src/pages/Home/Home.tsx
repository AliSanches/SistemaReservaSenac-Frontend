import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { BuscarReservas } from "./BuscarReservas";
import { CadastrarReserva } from "./CadastrarReserva";
import { Paginacao } from "./Paginacao";

export const Home = () => {
  return (
    <section className="container-lg">
      <Stack direction="horizontal" gap={3}>
        <div className="">
          <BuscarReservas />
        </div>
        <div className="lh-sm ms-auto mb-3">
          <CadastrarReserva />
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
          <Card.Img variant="top" src="/sala01.jpg" />
          <Card.Body>
            <Card.Title className="d-flex gap-2 fw-normal">
              Sala: <p className="text-primary m-0 fw-semibold">402</p>
            </Card.Title>
            <div>
              <span className="text-black d-flex gap-2">
                Turma: <p className="m-0 text-primary fw-semibold">10</p>
              </span>
              <span className="text-black d-flex gap-2">
                Curso:{" "}
                <p className="m-0 text-primary fw-semibold">Administração</p>
              </span>
              <span className="text-black d-flex gap-2">
                Dia Inicio:{" "}
                <p className="m-0 text-primary fw-semibold">10/01/2025</p>
              </span>
              <span className="text-black d-flex gap-2">
                Dia Término:{" "}
                <p className="m-0 text-primary fw-semibold">12/01/2025</p>
              </span>
              <span className="text-black d-flex gap-2">
                Hora Entrada:{" "}
                <p className="m-0 text-primary fw-semibold">13:00H</p>
              </span>
              <span className="text-black d-flex gap-2">
                Hora Saída:{" "}
                <p className="m-0 text-primary fw-semibold">17:30H</p>
              </span>
            </div>
          </Card.Body>
        </Card>
      </div>

      <Paginacao />
    </section>
  );
};
