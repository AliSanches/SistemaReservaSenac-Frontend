import { ModalAtualizarSala } from "./ModalAtualizarSala";
import { ModalExcluirSala }   from "./ModalExcluirSala";
import { DadosSala } from "./api/types";

export const CardSala: React.FC<DadosSala> = ({ dadosSala }) => {
    return (
        <>
            <table className="table table-bordered table-striped text-white">
                <tbody>
                <tr>
                    <th>Curso</th>
                    <td className="text-primary fw-semibold">{dadosSala.cursos ? dadosSala.cursos.nome : ""}</td>
                </tr>
                <tr>
                    <th>Turma</th>
                    <td className="text-primary fw-semibold">{dadosSala.turmas ? dadosSala.turmas.nome : ""}</td>
                </tr>
                <tr>
                    <th>N° da Sala</th>
                    <td className="text-primary fw-semibold">{dadosSala.numeroSala}</td>
                </tr>
                <tr>
                    <th>Capacidade</th>
                    <td className="text-primary fw-semibold">{dadosSala.capacidade}</td>
                </tr>
                <tr>
                    <th>Tipo da sala</th>
                    <td className="text-primary fw-semibold">{dadosSala.tipoSala}</td>
                </tr>
                <tr>
                    <th>Case (Armário)</th>
                    <td className="text-primary fw-semibold">{dadosSala.caseArmario}</td>
                </tr>
                <tr>
                    <th>Comporta Notebook</th>
                    <td className="text-primary fw-semibold">{dadosSala.comportaNotebook}</td>
                </tr>
                <tr>
                    <td colSpan={2}>
                    <div className="d-flex justify-content-end gap-2">
                        <ModalAtualizarSala dadosSala={dadosSala} />
                        <ModalExcluirSala idSala={dadosSala}/>
                    </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    )
}