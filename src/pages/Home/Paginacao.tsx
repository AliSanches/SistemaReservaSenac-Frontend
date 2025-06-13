import Pagination            from "react-bootstrap/Pagination";
import { PagesFN }           from "../../pages/Reservas/api/types.tsx";
import style                 from "../../pages/Reservas/Style/style.module.css"
import { useSuspenseQuery }  from "@tanstack/react-query";
import { getReserva }        from "../../pages/Reservas/api/api.tsx";

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
    queryKey: ["lista-qtdReserva", skip],
    queryFn: async () => await getReserva(skip),
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
        {data.curso?.length > 5 ? (
          <Pagination.Next className={`${style.pageNoneRelative}`} onClick={nextPage} />
        ) : (
          <Pagination.Next disabled />
        )
        }
      </Pagination>
    </div>
  );
};
