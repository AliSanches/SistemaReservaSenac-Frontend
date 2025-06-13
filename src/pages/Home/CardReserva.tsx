import Card                      from "react-bootstrap/Card";
import { DadosReserva }          from "../../pages/Reservas/api/types";

export const CardReserva: React.FC<DadosReserva> = ({ dadosReserva }) => {
    return (
        <>
            <Card className="my-2 d-flex justify-content-center" style={{ width: "270px" }}>
                <Card.Img variant="top" src="/sala01.jpg" />
                <Card.Body>
                    <Card.Title className="d-flex gap-2 fw-normal">
                    Sala: <p className="text-primary m-0 fw-semibold">{dadosReserva.sala}</p>
                    </Card.Title>
                    <div>
                    <span className="text-black d-flex gap-2">
                        Curso:{" "}
                        <p className="m-0 text-primary fw-semibold">{dadosReserva.idCurso}</p>
                    </span>
                    <span className="text-black d-flex gap-2">
                        Turma: <p className="m-0 text-primary fw-semibold">{dadosReserva.idTurma}</p>
                    </span>
                    <span className="text-black d-flex gap-2">
                        Reserva Início:{" "}
                        <p className="m-0 text-primary fw-semibold">{dadosReserva.dataInicio}</p>
                    </span>
                    <span className="text-black d-flex gap-2">
                        Reserva Término:{" "}
                        <p className="m-0 text-primary fw-semibold">{dadosReserva.dataTermino}</p>
                    </span>
                    <span className="text-black d-flex gap-2">
                        Hora Entrada:{" "}
                        <p className="m-0 text-primary fw-semibold">{dadosReserva.horaInicio}</p>
                    </span>
                    <span className="text-black d-flex gap-2">
                        Hora Saída:{" "}
                        <p className="m-0 text-primary fw-semibold">{dadosReserva.horaTermino}</p>
                    </span>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}