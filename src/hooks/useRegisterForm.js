import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/authSchema";

export const useRegisterForm = () => {
  return useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "jogh",
      email: "josht@gmail.com",
      pass: "azerty",
      ConfirmPass: "azerty",
    },
  });
};
