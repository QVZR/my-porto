import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AnswerProps } from "../../utils/api/types";

import type { RootState } from "../store";

export interface answerState {
  data: AnswerProps[];
}

const initialState: answerState = {
  data: [],
};

export const answerSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    setAnswerData: (state: answerState, action: PayloadAction<AnswerProps>) => {
      state.data = state.data.concat(action.payload);
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.answers,
      };
    },
  },
});

export const { setAnswerData } = answerSlice.actions;

export const selectAnswersData = (state: RootState) => state.answers.data;

export const answersReducer = answerSlice.reducer;
