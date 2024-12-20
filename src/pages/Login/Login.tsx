import { useState } from "react";
import style from "./style.module.css";
import logo from "/Senac_logo.svg.png";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import UserStore from "../../store/userStore";
import Spinner from "react-bootstrap/Spinner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "./FormLogin/FormSchema";
import { useNavigate } from "react-router";

type FormData = z.infer<typeof FormSchema>;

export const Login = () => {
  const user: any = UserStore();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const authenticar = async (data: FormData) => {
    setLoading(true);
    await user.authenticate(data, navigate);
    setLoading(false);
  };

  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", width: "100%" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  return (
    <main
      className={`${style.fundo} container-fluid d-flex justify-content-center align-items-center`}
    >
      <div
        className="container-lg d-flex justify-content-center align-items-center"
        style={{ height: "100vh", width: "100vw" }}
      >
        <div
          className={`${style.containerDimensao} bg-light shadow-lg rounded `}
        >
          <div className="container my-4 d-flex justify-content-center">
            <img className={style.logo} src={logo} alt={logo} />
          </div>

          <div className="container my-4 d-flex flex-column gap-3">
            <form onSubmit={handleSubmit(authenticar)}>
              <FloatingLabel
                controlId="floatingInput"
                label="E-mail"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="nome@exemplo.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="m-0 py-1 text-danger">{errors.email.message}</p>
                )}
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Senha">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="m-0 py-1 text-danger">
                    {errors.password.message}
                  </p>
                )}
              </FloatingLabel>

              <button type="submit" className="btn btn-primary shadow-sm mt-4">
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
