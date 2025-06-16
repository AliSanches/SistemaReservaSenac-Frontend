import { ModalAtualizarReserva } from "./ModalAtualizarReserva";
import { ModalExcluirReserva }   from "./ModalExcluirReserva";
import { DadosReserva }          from "./api/types";
import { formatarData }          from "../../components/FormatDate";

export const CardReserva: React.FC<DadosReserva> = ({ dadosReserva }) => {
    return (
        <>
            <table className="table table-bordered table-striped text-white">
                <tbody>
                <tr>
                    <th>Sala</th>
                    <td className="text-primary fw-semibold">{dadosReserva.salas.numeroSala}</td>
                </tr>
                <tr>
                    <th>Curso</th>
                    <td className="text-primary fw-semibold">{dadosReserva.cursos.nome}</td>
                </tr>
                <tr>
                    <th>Turma</th>
                    <td className="text-primary fw-semibold">{dadosReserva.turmas.turma}</td>
                </tr>
                <tr>
                    <th>Reserva Inicio</th>
                    <td className="text-primary fw-semibold">{formatarData(dadosReserva.dataInicio)}</td>
                </tr>
                <tr>
                    <th>Reserva Término</th>
                    <td className="text-primary fw-semibold">{formatarData(dadosReserva.dataTermino)}</td>
                </tr>
                <tr>
                    <th>Hora Entrada</th>
                    <td className="text-primary fw-semibold">{dadosReserva.horaInicio}</td>
                </tr>
                <tr>
                    <th>Hora Saída</th>
                    <td className="text-primary fw-semibold">{dadosReserva.horaTermino}</td>
                </tr>
                <tr>
                    <td colSpan={2}>
                    <div className="d-flex justify-content-end gap-2">
                        <ModalAtualizarReserva dadosReserva={dadosReserva} />
                        <ModalExcluirReserva idReserva={dadosReserva} />
                    </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    )
}

