import React from "react";
import { Button, Typography } from "@mui/material";
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

  const login = useGoogleLogin({
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
          password: Math.random().toString(36).slice(-8),
        });

        setCookie(null, "token", userData.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });

        dispatch(setUserData(userData));

        console.log(userData);
      } catch (err) {
        console.log(err);
      }
    },
  });

	
  return (
    <div className={styles.rightLogin}>
      <Typography variant="h4">Вход в аккаунт</Typography>

      <Button onClick={setFormTypeLogin} fullWidth variant="contained">
        <MailOutlineRounded /> Почта
      </Button>

      <Button onClick={() => login()} fullWidth variant="contained">
        <img src="/img/static/google.svg" alt="Google" /> Google
      </Button>

      {/* <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              var decoded = jwt_decode(credentialResponse.credential as string);
              console.log(decoded);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            width="300px"
            size="large"
          /> */}

      <Button fullWidth variant="contained">
        <img src="/img/static/github.svg" alt="Google" /> github
      </Button>

      <div onClick={setFormTypeRegistr} className={styles.registration}>
        Регистрация
      </div>
    </div>
  );
};
