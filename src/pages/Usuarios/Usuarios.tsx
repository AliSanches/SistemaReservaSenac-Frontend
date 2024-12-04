import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

import { BuscarUsuario } from "./BuscarUsuario";
import { ModalCadastrarUsuario } from "./ModalCadastrarUsuario";
import { ModalAtualizarUsuario } from "./ModalAtualizarUsuario";
import { ModalExcluirUsuario } from "./ModalExcluirUsuario";
import { Paginacao } from "./Paginacao";

export const Usuarios = () => {
  return (
    <section className="container-lg">
      <Stack direction="horizontal" gap={3}>
        <div className="">
          <BuscarUsuario />
        </div>
        <div className="lh-sm ms-auto mb-3">
          <ModalCadastrarUsuario />
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
          <div className="d-flex justify-content-center py-2">
            <Card.Img
              variant="top"
              src="/sala01.jpg"
              style={{ width: "100px", height: "100px" }}
              className="rounded-circle"
            />
          </div>
          <Card.Body>
            <Card.Title className="d-flex gap-2 fw-normal">
              Nome: <p className="text-primary m-0 fw-semibold">Teste 01</p>
            </Card.Title>
            <div>
              <span className="text-black d-flex gap-2">
                Login: <p className="m-0 text-primary fw-semibold">teste.01</p>
              </span>
              <span className="text-black d-flex gap-2">
                E-mail:{" "}
                <p className="m-0 text-primary fw-semibold">teste@gmail.com</p>
              </span>
              <span className="text-black d-flex gap-2">
                Permissão:{" "}
                <p className="m-0 text-primary fw-semibold">Administrador</p>
              </span>
            </div>
            <div className="d-flex gap-4 mt-3 justify-content-between">
              <ModalAtualizarUsuario />
              <ModalExcluirUsuario />
            </div>
          </Card.Body>
        </Card>
      </div>
      <Paginacao />
    </section>
  );
};
