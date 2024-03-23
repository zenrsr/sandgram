import { z } from "zod";

export const formValidation = z.object({
  name: z.string().min(4, { message: "Too short!" }).max(25),
  username: z.string().min(3, { message: "*Nuh uh!" }).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "*Password must be at least 8 characters long." })
});
