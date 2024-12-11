export interface Curso {
  id?: number;
  nome: string;
  categoria: string;
}

export interface DadosCurso {
  dadosCurso: Curso;
}

export interface IdDadosCurso {
  idCurso: Curso;
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
