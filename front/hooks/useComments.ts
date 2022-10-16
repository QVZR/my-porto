import { Dispatch, SetStateAction, useEffect } from "react";
import { useState } from "react";
import { CommentProps } from "./../utils/api/types";
import { Api } from "../utils/api";
import { number } from "yup";

type UseCommentsProps = {
  setComments: Dispatch<SetStateAction<CommentProps[]>>;
  comments: CommentProps[];
};

export const useComments = (postId?: number): UseCommentsProps => {
  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const comment = await Api().comment.getAll(postId as number);

        setComments(comment);
      } catch (error) {
        console.warn("Fetch comment", error);
      }
    })();
  }, []);
  return { comments, setComments };
};
