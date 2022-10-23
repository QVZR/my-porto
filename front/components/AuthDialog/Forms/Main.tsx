import React, { useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { MailOutlineRounded } from "@mui/icons-material";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { gapi } from "gapi-script";

import styles from "../AuthDialog.module.scss";

interface MainProps {
  setFormTypeLogin: () => void;
  setFormTypeRegistr: () => void;
}

export const Main: React.FC<MainProps> = ({ setFormTypeLogin, setFormTypeRegistr }) => {
  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response);
  };

  let gapi: any;

  (async () => {
    const data = await import("gapi-script");

    gapi = data;
  })();

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        scope: "",
      });
    };
    gapi && gapi.load("client:auth2", initClient);
  });

  return (
    <div className={styles.rightLogin}>
      <Typography variant="h4">Вход в аккаунт</Typography>
      <Button onClick={setFormTypeLogin} fullWidth variant="contained">
        <MailOutlineRounded /> Почта
      </Button>

      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID as string}
        render={(renderProps: any) => (
          <Button onClick={renderProps.onClick} fullWidth variant="contained">
            <img src="/img/static/google.svg" alt="Google" /> Google
          </Button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />

      {/* <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID as string}
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} fullWidth variant="contained">
            <img src="/img/static/google.svg" alt="Google" /> Google
          </Button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      /> */}

      <div onClick={setFormTypeRegistr} className={styles.registration}>
        Регистрация
      </div>
    </div>
  );
};
