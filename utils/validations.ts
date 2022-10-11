import * as yup from "yup";

export const LoginSchema = yup.object({
  email: yup.string().email("Неверная почта").required("Почта обязательна"),
  password: yup.string().min(6, "Минимум символов - 6").required("Пароль обязателен"),
});

export const RegistrSchema = yup
  .object({
    fullName: yup.string().required("Имя и фамилии обязательны"),
  })
  .concat(LoginSchema);
