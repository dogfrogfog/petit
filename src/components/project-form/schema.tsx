import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  status: z.enum(["open", "closed"], {
    message: "Please select a status.",
  }),
  description: z.string().min(1, {
    message: "Please enter a description.",
  }),
  url: z
    .string()
    .url({
      message: "Please enter a valid url.",
    })
    .optional(),
});
