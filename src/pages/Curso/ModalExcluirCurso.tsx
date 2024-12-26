import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { notify } from "../../components/notify";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { remove } from "./api/api";

import { IdDadosCurso } from "./api/types";

export const ModalExcluirCurso: React.FC<IdDadosCurso> = ({ idCurso }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => await remove(idCurso.id),
    onSuccess: (response) => {
      if (response?.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["lista-cursos"] });

        setShow(false);

        notify(response.data.message, "success");
      } else if (response?.status === 400) {
        setShow(false);

        notify(response.data.message, "warning");
      } else if (response?.status === 500) {
        setShow(false);

        notify(response.data.message, "error");
      }
    },
  });

  return (
    <>
      <Button variant="danger" className="shadow" onClick={handleShow}>
        Excluir
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="d-flex flex-column">
          <Modal.Title>
            Deseja realmente <span className="text-danger">excluir</span> ?
          </Modal.Title>
          <div className="d-flex gap-4 my-3">
            <Button variant="secondary" onClick={handleClose}>
              NÃO
            </Button>
            <Button variant="danger" type="submit" onClick={() => mutate()}>
              SIM
            </Button>
          </div>
        </Modal.Header>
      </Modal>
    </>
  );
};
