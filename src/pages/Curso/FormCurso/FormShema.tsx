import { z } from "zod";

export const FormSchema = z.object({
  curso: z
    .string()
    .min(5, { message: "Nome do curso obrigatório" }),
});