export interface Turma {
  id?: number;
  idCurso: string;
  turma: string;
  dataInicio: string;
  dataFinal: string;
  entrada: string;
  saida: string;
}

export interface DadosTurma {
  dadosTurma: Turma;
}

export interface PagesFN {
  totalPages: number;
  skip: number;
  nextPage: () => void;
  backPage: () => void;
}

export interface Search {
  search: string;
  setSearch: string | any;
}
