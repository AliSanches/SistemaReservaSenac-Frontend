import { ModalAtualizarTurma } from "./ModalAtualizarTurma";
import { ModalExcluirTurma }   from "./ModalExcluirTurma";
import { DadosTurma }          from "./api/types";
import { formatarData }        from "../../components/FormatDate";

export const CardTurma: React.FC<DadosTurma> = ({ dadosTurma }) => {
  return (
    <>
      <table className="table table-bordered table-striped text-white">
        <tbody>
          <tr>
            <th>Curso</th>
            <td className="text-primary fw-semibold">{dadosTurma.cursos.nome}</td>
          </tr>
          <tr>
            <th>Turma</th>
            <td className="text-primary fw-semibold">{dadosTurma.turma}</td>
          </tr>
          <tr>
            <th>Data Início</th>
            <td className="text-primary fw-semibold">{formatarData(dadosTurma.dataInicio)}</td>
          </tr>
          <tr>
            <th>Data Término</th>
            <td className="text-primary fw-semibold">{formatarData(dadosTurma.dataFinal)}</td>
          </tr>
          <tr>
            <th>Entrada</th>
            <td className="text-primary fw-semibold">{dadosTurma.entrada}</td>
          </tr>
          <tr>
            <th>Saída</th>
            <td className="text-primary fw-semibold">{dadosTurma.saida}</td>
          </tr>
          <tr>
            <td colSpan={2}>
              <div className="d-flex justify-content-end gap-2">
                <ModalAtualizarTurma dadosTurma={dadosTurma} />
                <ModalExcluirTurma dadosTurma={dadosTurma} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
