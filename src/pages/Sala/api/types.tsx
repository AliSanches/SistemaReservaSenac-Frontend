export interface Sala {
  id?: number;
  idCurso: string;
  idTurma: string;
  numeroSala: string;
  capacidade: string;
  case: string;
  comportaNotebook: string;
}

export interface DadosSala {
  dadosSala: Sala;
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
