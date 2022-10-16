import { AxiosInstance } from "axios";
import { AnswerProps } from "./types";

type CreateAnswerDto = {
  commentId: number;
  postId: number;
  text: string;
};

export const AnswerApi = (instance: AxiosInstance) => ({
  async getAll(commentId: number, postId: number) {
    const { data } = await instance.get<AnswerProps[]>("/answers", {
      params: { commentId, postId },
    });
    return data;
  },
  async getAllAll() {
    const { data } = await instance.get<AnswerProps[]>("/answers");
    return data;
  },

  async create(dto: CreateAnswerDto) {
    const { data } = await instance.post<CreateAnswerDto, { data: AnswerProps }>("/answers", dto);
    return data;
  },

  async remove(id: number) {
    return instance.delete("/answers/" + id);
  },
});
