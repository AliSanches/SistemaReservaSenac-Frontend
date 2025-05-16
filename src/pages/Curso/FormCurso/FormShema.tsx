import { z } from "zod";

export const FormSchema = z.object({
  nome: z
    .string()
    .min(5, { message: "Nome do curso obrigatório" }),
  categoria: z
    .string(),
});