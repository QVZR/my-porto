import { Button, Input } from "@mui/material";
import React, { useRef, useState } from "react";
import { Api } from "../../utils/api";
import { AnswerProps } from "../../utils/api/types";

import styles from "./AddAnswerForm.module.scss";

interface AddAnswerFormProps {
  commentId: number;
  postId: number;
  onAdd: (obj: AnswerProps) => void;
}

export const AddAnswerForm: React.FC<AddAnswerFormProps> = ({ commentId, onAdd, postId }) => {
  const [text, setText] = useState("");
  const [clicked, setClicked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onButtonClick = async () => {
    try {
      setIsSubmitting(true);
      const answer = await Api().answer.create({
        commentId,
        text,
        postId,
      });

      onAdd(answer);
      setClicked(false);
      setText("");
    } catch (error) {
      console.warn("AddComment", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.form}>
      <Input
        disabled={isSubmitting}
        onFocus={() => setClicked(true)}
        onChange={(event) => {
          setText(event.target.value);
        }}
        classes={{ root: styles.textarea }}
        minRows={clicked ? 5 : 1}
        value={text}
        fullWidth
        multiline
        placeholder="Написать комментарий..."
      />
      {clicked && (
        <Button
          disabled={isSubmitting}
          onClick={(e) => {
            onButtonClick();
            e.stopPropagation();
          }}
          variant="contained"
          className={styles.button}
        >
          send
        </Button>
      )}
    </div>
  );
};
