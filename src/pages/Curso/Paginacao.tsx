import Pagination from "react-bootstrap/Pagination";

import style from "./curso.module.css";

interface PagesFN {
  totalPages: number;
  skip: number;
  nextPage: () => void;
  backPage: () => void;
}

export const Paginacao = ({
  nextPage,
  backPage,
  totalPages,
  skip,
}: PagesFN) => {
  const paginalAtual = Math.floor(skip / 6) + 1;

  const indice = [];

  for (let i = 0; i <= totalPages; i++) {
    indice.push(i);
  }

  return (
    <div
      className={`${style.paginacao} container-fluid d-flex justify-content-center align-items-end`}
    >
      <Pagination>
        <Pagination.Prev onClick={backPage} />
        {indice.map((index) => (
          <Pagination.Item active={index === paginalAtual}>
            {index}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={nextPage} />
      </Pagination>
    </div>
  );
};
