import { z } from "zod";

export const FormSchema = z.object({
  idCurso: z
  .string()
  .min(1, { message: "Curso Invalido!" })
  .optional()
  .or(z.literal("")),
  idTurma: z
  .string()
  .min(1, { message: "Turma Invalida!" })
  .optional()
  .or(z.literal("")),
  numeroSala: z.string().min(1),
  capacidade: z.string(),
  tipoSala: z.string(),
  caseArmario: z.string(),
  comportaNotebook: z.string(),
});
