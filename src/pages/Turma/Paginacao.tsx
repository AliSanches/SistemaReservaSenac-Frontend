import Pagination from "react-bootstrap/Pagination";

import style from "./Turma.module.css";

export const Paginacao = () => {
  const active: number = 3;
  const items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div
      className={`${style.paginacao} container-fluid d-flex justify-content-center align-items-end`}
    >
      <Pagination>{items}</Pagination>
    </div>
  );
};
