import * as z from "zod"
export const accountCreationFormSchema = z.object({
  name: z.string().min(2).max(50),
  balance: z.number(),
  type: z.enum([
    "CHECKING",
    "SAVINGS",
    "CREDIT_CARD",
    "CASH",
    "LINE_OF_CREDIT",
    "MORTGAGE",
    "AUTO_LOAN",
    "STUDENT_LOAN",
    "MEDICAL_DEBT",
    "OTHER_DEBT",
    "OTHER_ASSET",
    "OTHER_LIABILITY"
  ])
})