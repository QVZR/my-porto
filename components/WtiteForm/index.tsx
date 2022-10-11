import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import "easymde/dist/easymde.min.css";
import styles from "./WriteForm.module.scss";
import Link from "next/link";
import dynamic from "next/dynamic";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), { ssr: false });

export const WriteForm = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const isEditing = Boolean(true);

  const onChange = React.useCallback((value: string) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  // const isAuth = useSelector(isAuthSelector);
  // if (!window.localStorage.getItem("token") && !isAuth) {
  //   return <Navigate to="/" />;
  // }

  return (
    <Paper elevation={0} style={{ padding: 30 }} className={styles.wrapper}>
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <SimpleMdeReact
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        {isEditing ? (
          <Button size="large" variant="contained">
            Сохранить
          </Button>
        ) : (
          <Button size="large" variant="contained">
            Опубликовать
          </Button>
        )}
        <Link href="/">
          <a>
            <Button size="large">Отмена</Button>
          </a>
        </Link>
      </div>
    </Paper>
  );
};
