import React, { useState } from "react";
import { Alert, Button, Typography } from "@mui/material";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "../AuthDialog.module.scss";
import { LoginSchema } from "../../../utils/validations";
import { FormField } from "../../FormField";
import { setCookie } from "nookies";
import { useAppDispatch } from "../../../redux/hooks";
import { setUserData } from "../../../redux/slices/user";
import { Api } from "../../../utils/api";

interface LoginProps {
  setFormTypeMain: () => void;
  setFormTypeRegistr: () => void;
  onClose: () => void;
}

export const Login: React.FC<LoginProps> = ({ setFormTypeMain, setFormTypeRegistr }) => {
  const dispatch = useAppDispatch();

  const form = useForm({ resolver: yupResolver(LoginSchema), mode: "onChange" });
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (dto: any) => {
    try {
      const data = await Api().user.login(dto);

      setCookie(null, "token", data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setErrorMessage("");
      dispatch(setUserData(data));
      setFormTypeMain();
    } catch (error: any) {
      console.warn("Login error", error);

      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className={styles.rightLogin}>
      <div onClick={setFormTypeMain} className={styles.back}>
        <ArrowBackIosNewRounded />
        <span>Back</span>
      </div>
      <Typography variant="h5">Login via email</Typography>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField holder="Email" name="email" />
          <FormField holder="Password" name="password" />
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
            Login
          </Button>
        </form>
      </FormProvider>
      <div onClick={setFormTypeRegistr} className={styles.registration}>
        Registration
      </div>
    </div>
  );
};
