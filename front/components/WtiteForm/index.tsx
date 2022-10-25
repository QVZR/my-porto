import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import "easymde/dist/easymde.min.css";
import styles from "./WriteForm.module.scss";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Api } from "../../utils/api";
import { PostProps } from "../../utils/api/types";
import { SimpleMDEReactProps } from "react-simplemde-editor";

const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), { ssr: false });

interface WriteFormProps {
  data?: PostProps;
}

export const WriteForm: React.FC<WriteFormProps> = ({ data }) => {
  const [text, setText] = useState("");
  const router = useRouter();
  const [title, setTitle] = useState(data?.title || "");
  const [isLoading, setIsLodaing] = useState(false);

  const onChange = React.useCallback((value: string) => {
    setText(value);
  }, []);

  const options: SimpleMDEReactProps = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,

      autosave: {
        uniqueId: data?.id.toString() as string,
        enabled: true,
        delay: 1000,
      },
      hideIcons: ["image", "link", "guide", "preview", "side-by-side", "fullscreen"],
    }),
    []
  );

  const onAddPost = async () => {
    try {
      setIsLodaing(true);
      const obj = {
        title,
        text,
      };
      if (!data) {
        const post = await Api().post.create(obj);
        await router.push(`write/${post.id}`);
      }
      if (data) {
        await Api().post.update(data.id, obj);
      }

      setTitle("");
      setText("");
      router.push("/blog/");
    } catch (error) {
      console.warn("Create post", error);
      alert(error);
    } finally {
      setIsLodaing(false);
    }
  };

  return (
    <Paper elevation={0} style={{ padding: 25 }} className={styles.wrapper}>
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Post title..."
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <SimpleMdeReact
        className={styles.editor}
        value={data?.text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button
          className={styles.inButton}
          disabled={isLoading || !text || !title}
          onClick={onAddPost}
          size="large"
          variant="contained"
        >
          {data ? "Save" : "Public"}
        </Button>

        <Link href="/blog">
          <a>
            <Button className={styles.inButton} size="large">
              Cancel
            </Button>
          </a>
        </Link>
      </div>
    </Paper>
  );
};
