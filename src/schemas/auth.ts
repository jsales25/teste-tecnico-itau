import { z } from "zod";

export const loginSchema = z.object({
  location: z.string().min(1, "Selecione uma localização"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export type LoginForm = z.infer<typeof loginSchema>;