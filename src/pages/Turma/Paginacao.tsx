import Pagination           from "react-bootstrap/Pagination";
import { PagesFN }          from "./api/types";
import { getTurma }         from "./api/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import style                from "./style/style.module.css"

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

  const { data } = useSuspenseQuery({
    queryKey: ["lista-qtdTurma", skip],
    queryFn: async () => await getTurma(skip)
  });

  return (
    <div
      className={`container-fluid py-5 d-flex justify-content-center align-items-end`}
    >
      <Pagination>
        {paginalAtual > 1 ? (
          <Pagination.Prev onClick={backPage} />
        ): (
          <Pagination.Prev disabled />
        )}
        {indice.map((index) => (
          <Pagination.Item className={`${style.page}`} key={index} active={index === paginalAtual}>
            {index}
          </Pagination.Item>
        ))}
        {data.turma.length > 5 ? (
          <Pagination.Next className={`${style.pageNoneRelative}`} onClick={nextPage} />
        ) : (
          <Pagination.Next disabled />
        )
        }
      </Pagination>
    </div>
  );
};
