import Card from "react-bootstrap/Card";

import { ModalAtualizarCurso } from "./ModalAtualizarCurso";
import { ModalExcluirCurso } from "./ModalExcluirCurso";

import { DadosCurso } from "./api/types";

import style from "./style/style.module.css";



export const CardCurso: React.FC<DadosCurso> = ({ dadosCurso }) => {
  const imagemUrl = `${import.meta.env.VITE_API_URL}/uploads/${dadosCurso.arquivo}`;
  return (
    <>
      <Card
        className={`${style.cardCurso} my-2 d-flex justify-content-center shadow bg-secondary`} style={{
          backgroundImage: `url(${imagemUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Card.Body
          className={` d-flex p-2 justify-content-between flex-column`}
        >
          <Card.Text style={{ height: "30px" }}>
            <span
              className={`${style.transparencia} text-white d-flex gap-2 px-2 py-1 rounded-5 shadow`}
              style={{ width: "200px" }} 
            >
              {dadosCurso.categoria}
            </span>
          </Card.Text>
          <Card.Title className="d-flex flex-column gap-2 fw-normal">
            <p className="text-white m-0">{dadosCurso.nome}</p>
            <div className="d-flex gap-4 justify-content-between">
              <ModalAtualizarCurso dadosCurso={dadosCurso} />
              <ModalExcluirCurso idCurso={dadosCurso} />
            </div>
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};
