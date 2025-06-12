import { z } from "zod";

export const FormSchema = z.object({
  sala: z
    .number(),
  idCurso: z
    .number(),
  idTurma: z
    .number(),
  dataInicio: z
    .string(),
  dataTermino: z
    .string(),
  horaInicio: z
    .string(),
  horaTermino: z
    .string(),    
});