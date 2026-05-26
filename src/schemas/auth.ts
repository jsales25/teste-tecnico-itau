import { z } from "zod";

export const loginSchema = z.object({
  location: z.string().min(1, "Selecione uma localização"),
  email: z.string().nonempty("Preenchimento obrigatório").email("Email inválido"),
  password: z.string().nonempty("Preenchimento obrigatório").min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z.string().nonempty("Preenchimento obrigatório").min(8, "Senha deve ter no mínimo 8 caracteres"),
  newPassword: z.string().nonempty("Preenchimento obrigatório").min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

export const registerSchema = z.object({
  name: z.string().min(7, "Nome deve ter pelo menos 7 caracteres"),
  email: z.string().nonempty("Preenchimento obrigatório").email("Email inválido"),
  password: z.string().nonempty("Preenchimento obrigatório").min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export type RegisterForm = z.infer<typeof registerSchema>;
