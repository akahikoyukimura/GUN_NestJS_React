import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/authSchema";

export const useLoginForm = () => {
  return useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "john@test.com",
      pass: "azerty12*",
      rememberMe: false,
    },
  });
};