import { z } from "zod";

export const FormSchema = z.object({
  idCurso: z.string().min(1, { message: "O valor deve ser inteiro!" }),
  turma: z.string().min(1, { message: "Turma Invalida!" }),
  dataInicio: z.string(),
  dataFinal: z.string(),
  entrada: z.string(),
  saida: z.string(),
});
