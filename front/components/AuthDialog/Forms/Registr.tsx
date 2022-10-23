import React, { useState } from "react";
import { setCookie } from "nookies";
import { Alert, Button, Typography } from "@mui/material";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormField } from "../../FormField";
import { RegistrSchema } from "../../../utils/validations";

import styles from "../AuthDialog.module.scss";
import { Api } from "../../../utils/api";
import { useAppDispatch } from "../../../redux/hooks";
import { setUserData } from "../../../redux/slices/user";

interface RegistrProps {
  setFormTypeLogin: () => void;
  setFormTypeMain: () => void;
}

export const Registr: React.FC<RegistrProps> = ({ setFormTypeLogin, setFormTypeMain }) => {
  const dispatch = useAppDispatch();

  const form = useForm({ resolver: yupResolver(RegistrSchema), mode: "onChange" });
  const [errorMessage, setErrorMessage] = useState(false);

  const onSubmit = async (dto: any) => {
    try {
      const data = await Api().user.registr(dto);

      setCookie(null, "token", data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setErrorMessage(false);
      dispatch(setUserData(data));
      setFormTypeMain();
    } catch (error: any) {
      console.warn("Ошибка при регистрации", error);

      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className={styles.rightLogin}>
      <div onClick={setFormTypeMain} className={styles.back}>
        <ArrowBackIosNewRounded />
        <span>Назад</span>
      </div>
      <Typography variant="h5">Регистрация</Typography>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField holder="Имя и фамилия" name="fullName" />
          <FormField holder="Почта" name="email" />
          <FormField holder="Пароль" name="password" />
          {errorMessage && (
            <Alert className="mb-15" severity="error">
              {errorMessage}
            </Alert>
          )}
          <Button
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            type="submit"
            className={styles.inButton}
            fullWidth
            variant="contained"
          >
            Зарегистрироваться
          </Button>
        </form>
      </FormProvider>
      <div className="d-flex align-center">
        <div className="mr-5">Есть аккаунт?</div>
        <div onClick={setFormTypeLogin} className={styles.registration}>
          Войти
        </div>
      </div>
    </div>
  );
};
