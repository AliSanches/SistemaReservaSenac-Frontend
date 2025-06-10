import { z } from "zod";

export const FormSchema = z.object({
  idCurso: z.string().min(1, { message: "O valor deve ser inteiro!" }),
  idTurma: z.string().min(1, { message: "Turma Invalida!" }),
  numeroSala: z.string().min(1),
  capacidade: z.string().min(5),
  case: z.string(),
  comportaNotebook: z.string(),
});
