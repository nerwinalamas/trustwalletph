import { z } from "zod";

export const sendMoneySchema = z.object({
  email: z.string().min(1, "Recipient email is required"),
  amount: z.coerce
    .number({
      invalid_type_error: "Amount must be a number",
    })
    .min(0.01, "Amount must be greater than zero")
    .max(1000000, "Amount too large"),
  note: z.string().max(100, "Note too long").optional(),
});

export type SendMoneyFormData = z.infer<typeof sendMoneySchema>;
