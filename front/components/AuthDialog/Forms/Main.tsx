import React, { useState } from "react";
import { Alert, Button, Typography } from "@mui/material";
import { MailOutlineRounded } from "@mui/icons-material";
import { useGoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";
import styles from "../AuthDialog.module.scss";
import axios from "axios";
import { Api } from "../../../utils/api";
import { setCookie } from "nookies";
import { useAppDispatch } from "../../../redux/hooks";
import { setUserData } from "../../../redux/slices/user";

interface MainProps {
  setFormTypeLogin: () => void;
  setFormTypeRegistr: () => void;
}

export const Main: React.FC<MainProps> = ({ setFormTypeLogin, setFormTypeRegistr }) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const login = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            "Authorization": `Bearer ${respose.access_token}`,
          },
        });

        const userData = await Api().user.login({
          email: res.data.email,
          password: res.data.sub,
        });

        setCookie(null, "token", userData.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });

        dispatch(setUserData(userData));
        setErrorMessage("");
        console.log(res);
      } catch (error: any) {
        console.warn("Login error", error);

        setErrorMessage(error.response.data.message);
      }
    },
  });

  return (
    <div className={styles.rightLogin}>
      <Typography variant="h4">Login</Typography>

      <Button onClick={setFormTypeLogin} fullWidth variant="contained">
        <MailOutlineRounded /> Email
      </Button>

      <Button onClick={() => login()} fullWidth variant="contained">
        <img src="/img/static/google.svg" alt="Google" /> Google
      </Button>

      <Button fullWidth variant="contained">
        <img src="/img/static/github.svg" alt="Google" /> github
      </Button>

      {errorMessage && (
        <Alert className="mb-15" severity="error">
          {errorMessage}
        </Alert>
      )}

      <div onClick={setFormTypeRegistr} className={styles.registration}>
        Registration
      </div>
    </div>
  );
};
