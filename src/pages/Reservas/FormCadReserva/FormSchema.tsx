import { z } from "zod";

export const FormSchema = z.object({
  idSala: z
    .string(),
  idCurso: z
    .string(),
  idTurma: z
    .string(),
  dataInicio: z
    .string(),
  dataTermino: z
    .string(),
  horaInicio: z
    .string(),
  horaTermino: z
    .string(),    
});