import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  userName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  projectRoles: z.array(z.string()).min(1, {
    message: "Please select at least one project role.",
  }),
  projectDomains: z.array(z.string()).min(1, {
    message: "Please select at least one project domain.",
  }),
  expertiseLevel: z.string({
    required_error: "Please select an expertise level.",
  }),
  spokenLanguages: z.array(z.string()).min(1, {
    message: "Please select at least one language.",
  }),
  programmingLanguages: z.array(z.string()).min(1, {
    message: "Please select at least one programming language.",
  }),
});
