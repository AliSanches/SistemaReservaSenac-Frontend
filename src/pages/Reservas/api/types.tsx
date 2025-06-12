export interface Reserva {
    id: number;
    sala: number;
    idCurso: number;
    idTurma: number;
    dataInicio: string;
    dataTermino: string;
    horaInicio: string;
    horaTermino: string;
  }
  
  export interface DadosReserva {
    dadosReserva: Reserva;
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
  