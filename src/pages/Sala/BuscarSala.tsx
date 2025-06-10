import Form         from "react-bootstrap/Form";
import InputGroup   from "react-bootstrap/InputGroup";
import { Search }   from "./api/types";
import { FcSearch } from "react-icons/fc";

export const BuscarSala: React.FC<Search> = ({ search, setSearch }) => {
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">
          <FcSearch />
        </InputGroup.Text>
        <Form.Control
          placeholder="Buscar sala"
          aria-label="sala"
          aria-describedby="basic-addon1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
    </>
  );
};
