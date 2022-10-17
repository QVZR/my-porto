import { AxiosInstance } from "axios";
import { CommentProps } from "./types";

type CreateCommentDto = {
  postId: number;
  text: string;
};

export const CommentApi = (instance: AxiosInstance) => ({
  async getAll(postId: number) {
    const { data } = await instance.get<CommentProps[]>("/comments", { params: { postId } });
    return data;
  },

  async create(dto: CreateCommentDto) {
    const { data } = await instance.post<CreateCommentDto, { data: CommentProps }>(
      "/comments",
      dto
    );
    return data;
  },

  async remove(id: number) {
    return instance.delete("/comments/" + id);
  },
});
