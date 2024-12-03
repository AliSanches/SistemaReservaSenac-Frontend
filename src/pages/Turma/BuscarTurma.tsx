import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { FcSearch } from "react-icons/fc";

export const BuscarTurma = () => {
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">
          <FcSearch />
        </InputGroup.Text>
        <Form.Control
          placeholder="Buscar turma"
          aria-label="turma"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    </>
  );
};
