export interface Sala {
  id?: number;
  idCurso: string;
  idTurma: string;
  numeroSala: string;
  capacidade: string;
  tipoSala: string;
  caseArmario: string;
  comportaNotebook: string;
}

export interface DadosSala {
  dadosSala: Sala;
}

export interface IdDadosSala {
  idSala: Sala;
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
