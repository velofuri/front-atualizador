import z from "zod"

export const changePasswordSchema = z
  .object({
    password: z.string().min(6, "A senha deve possuir pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  })

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
