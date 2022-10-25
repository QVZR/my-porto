import * as yup from "yup";

export const LoginSchema = yup.object({
  email: yup.string().email("Invalid mail").required("Mail required"),
  password: yup.string().min(6, "Minimum characters - 6").required("Password required"),
});

export const RegistrSchema = yup
  .object({
    fullName: yup.string().required("First and last names are required"),
  })
  .concat(LoginSchema);
