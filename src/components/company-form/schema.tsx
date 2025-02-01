import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  domains: z.array(z.string()).min(1, {
    message: "Please select at least one domain.",
  }),
  size: z.string().min(1, {
    message: "Please enter company size.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  url: z.string().url({
    message: "URL must be a valid URL.",
  }),
});
