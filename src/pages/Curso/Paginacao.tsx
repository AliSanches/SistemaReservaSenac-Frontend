import Pagination from "react-bootstrap/Pagination";

import { PagesFN } from "./api/types";

export const Paginacao = ({
  nextPage,
  backPage,
  totalPages,
  skip,
}: PagesFN) => {
  const paginalAtual = Math.floor(skip / 6) + 1;

  const indice: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    indice.push(i);
  }

  return (
    <div
      className={`container-fluid py-5 d-flex justify-content-center align-items-end`}
    >
      <Pagination>
        <Pagination.Prev onClick={backPage} />
        {indice.map((index) => (
          <Pagination.Item key={index} active={index === paginalAtual}>
            {index}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={nextPage} />
      </Pagination>
    </div>
  );
};
