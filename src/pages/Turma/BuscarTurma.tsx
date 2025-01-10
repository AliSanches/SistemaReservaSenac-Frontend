import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { FcSearch } from "react-icons/fc";

import { Search } from "./api/types";

export const BuscarTurma: React.FC<Search> = ({ search, setSearch }) => {
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
    </>
  );
};
