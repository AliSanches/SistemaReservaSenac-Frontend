import Card                   from "react-bootstrap/Card";
import { ModalAtualizarSala } from "./ModalAtualizarSala";
import { ModalExcluirSala }   from "./ModalExcluirSala";
import { DadosSala } from "./api/types";

export const CardSala: React.FC<DadosSala> = ({ dadosSala }) => {
    return (
        <>
            <Card
            className="my-2 d-flex justify-content-center"
            style={{ width: "270px" }}
            >
            <Card.Img variant="top" src="/curso01.webp" />
            <Card.Body>
                <Card.Title className="d-flex gap-2 fw-normal">
                Curso:{" "}
                <span className="text-primary fw-semibold m-0">
                    Administração
                </span>
                </Card.Title>
            <div>
                <div className="mb-1">
                    Número da sala:{" "}
                    <span className="text-primary fw-semibold">{dadosSala.numeroSala}</span>
                </div>
                <div className="mb-1">
                    Capacidade de Alunos:{" "}
                    <span className="text-primary fw-semibold">{dadosSala.capacidade}</span>
                </div>
                <div className="mb-1">
                    Tipo da Sala:{" "}
                    <span className="text-primary fw-semibold">{dadosSala.tipoSala}</span>
                </div>
                <div className="mb-1">
                    Case (armário):{" "}
                    <span className="text-primary fw-semibold">{dadosSala.case}</span>
                </div>
                <div className="mb-1">
                    Comporta Notebook:{" "}
                    <span className="text-primary fw-semibold">{dadosSala.comportaNotebook}</span>
                </div>
            </div>
                <div className="d-flex gap-4 justify-content-between">
                    <ModalAtualizarSala />
                    <ModalExcluirSala />
                </div>
            </Card.Body>
            </Card>
        </>
    )
}