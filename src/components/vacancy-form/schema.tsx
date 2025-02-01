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
  requirements: z.string().min(1, {
    message: "Please enter requirements.",
  }),
  salary: z.string().min(1, {
    message: "Please enter a salary.",
  }),
  projectRoles: z.string().min(1, {
    message: "Please enter project roles.",
  }),
  projectDomains: z.string().min(1, {
    message: "Please enter project domains.",
  }),
  expertiseLevel: z.string().min(1, {
    message: "Please enter expertise level.",
  }),
  location: z.string().min(1, {
    message: "Please enter a location.",
  }),
});
