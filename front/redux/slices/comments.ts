import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { CommentProps } from "../../utils/api/types";

import type { RootState } from "../store";

export interface commentState {
  data: CommentProps[];
}

const initialState: commentState = {
  data: [],
};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setCommentData: (state: commentState, action: PayloadAction<CommentProps>) => {
      state.data = state.data.concat(action.payload);
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.comments,
      };
    },
  },
});

export const { setCommentData } = commentSlice.actions;

export const selectCommentsData = (state: RootState) => state.comments.data;

export const commentsReducer = commentSlice.reducer;
