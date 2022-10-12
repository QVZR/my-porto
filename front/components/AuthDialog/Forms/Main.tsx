import React from "react";
import { Button, Typography } from "@mui/material";
import { MailOutlineRounded } from "@mui/icons-material";

import styles from "../AuthDialog.module.scss";

interface MainProps {
  setFormTypeLogin: () => void;
  setFormTypeRegistr: () => void;
}

export const Main: React.FC<MainProps> = ({ setFormTypeLogin, setFormTypeRegistr }) => {
  return (
    <div className={styles.rightLogin}>
      <Typography variant="h4">Вход в аккаунт</Typography>
      <Button onClick={setFormTypeLogin} fullWidth variant="contained">
        <MailOutlineRounded /> Почта
      </Button>

      <Button fullWidth variant="contained">
        <img src="/img/static/google.svg" alt="Google" /> Google
      </Button>
      <div className={styles.buttonFutter}>
        <Button variant="contained">
          <img src="/img/static/facebook.svg" alt="" />
        </Button>
        <Button variant="contained">
          <img src="/img/static/twitter.svg" alt="" />
        </Button>
        <Button variant="contained">
          <img src="/img/static/apple.svg" alt="" />
        </Button>
      </div>
      <div onClick={setFormTypeRegistr} className={styles.registration}>
        Регистрация
      </div>
    </div>
  );
};
