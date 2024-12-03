import { IoAdd } from "react-icons/io5";

import { useNavigate } from "react-router";

export const CadastrarReserva = () => {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="fs-4 text-white py-1 px-2 rounded border-0 bg-primary"
        onClick={() => navigate("/app/reserva")}
      >
        <IoAdd />
      </button>
    </>
  );
};
