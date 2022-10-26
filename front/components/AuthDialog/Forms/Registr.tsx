import React, { useState } from "react";
import { setCookie } from "nookies";
import { Alert, Button, Typography } from "@mui/material";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormField } from "../../FormField";
import { RegistrSchema } from "../../../utils/validations";
import LoginGithub from "react-login-github";

const LoginGithub = dynamic(() => import("react-login-github"), {
  ssr: false,
}) as LoginGithub;

import styles from "../AuthDialog.module.scss";
import { Api } from "../../../utils/api";
import { useAppDispatch } from "../../../redux/hooks";
import { setUserData } from "../../../redux/slices/user";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import dynamic from "next/dynamic";

interface RegistrProps {
  setFormTypeLogin: () => void;
  setFormTypeMain: () => void;
}

export const Registr: React.FC<RegistrProps> = ({ setFormTypeLogin, setFormTypeMain }) => {
  const [data, setData] = useState();

  const dispatch = useAppDispatch();

  const form = useForm({ resolver: yupResolver(RegistrSchema), mode: "onChange" });
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (dto: any) => {
    try {
      const data = await Api().user.registr(dto);

      setCookie(null, "token", data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setErrorMessage("");
      dispatch(setUserData(data));
      setFormTypeMain();
    } catch (error: any) {
      console.warn("Registration error", error);

      setErrorMessage(error.response.data.message);
    }
  };

  const registrGoogle = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            "Authorization": `Bearer ${respose.access_token}`,
          },
        });

        const userData = await Api().user.registr({
          fullName: res.data.given_name,
          email: res.data.email,
          password: res.data.sub,
        });

        setCookie(null, "token", userData.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });

        dispatch(setUserData(userData));
        setFormTypeMain();
        setErrorMessage("");
        console.log(res);
      } catch (error: any) {
        console.warn("Registration error", error);

        setErrorMessage(error.response.data.message);
      }
    },
  });

  // ==================================================================================

  const onSuccess = async (response: any) => {
    try {
      const data = await Api().user.registrGitHub(response);

      setCookie(null, "token", data.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setErrorMessage("");
      dispatch(setUserData(data));
      setFormTypeMain();
    } catch (error: any) {
      console.warn("Registration error", error);

      setErrorMessage(error.response.data.message);
    }
  };
  const onFailure = (response: any) => console.error(response);

  return (
    <div className={styles.rightLogin}>
      <div onClick={setFormTypeMain} className={styles.back}>
        <ArrowBackIosNewRounded />
        <span>Back</span>
      </div>
      <Typography variant="h5">Registration</Typography>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField holder="Full name" name="fullName" />
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
            Sign up
          </Button>
        </form>
      </FormProvider>
      <Button onClick={() => registrGoogle()} fullWidth variant="contained">
        <img src="/img/static/google.svg" alt="Google" /> Google
      </Button>
      {/* <Button fullWidth variant="contained">
        <img src="/img/static/github.svg" alt="Google" /> github
      </Button> */}

      <LoginGithub
        clientId={process.env.GITHUB_CLIENT_ID}
        onSuccess={onSuccess}
        onFailure={onFailure}
        className={styles.buttonGit}
        scope="user"
      >
        <img src="/img/static/github.svg" alt="Google" />
        github
      </LoginGithub>

      <div className="d-flex align-center">
        <div className="mr-5">Have an account?</div>
        <div onClick={setFormTypeLogin} className={styles.registration}>
          Login
        </div>
      </div>
    </div>
  );
};
