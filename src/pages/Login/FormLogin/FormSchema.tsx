import { z } from "zod";

export const FormSchema = z.object({
  email: z
    .string()
    .email({ message: "E-mail Invalido!" })
    .min(5, { message: "E-mail é obrigatório" }),
  password: z.string().min(3, { message: "Senha obrigatória" }),
});
