export type UserLoginDto = {
  email: string;
  password: string;
  createdAt: string;
};
export type CreateUserDto = {
  fullName: string;
  email: string;
  password: string;
};

export type ResponseUser = {
  createdAt: string;
  email: string;
  fullName: string;
  commentsCount: number;
  id: number;
  token: string;
  updatedAt: string;
};

export type PostProps = {
  id: number;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  user: ResponseUser;
  comments: any;
};
export type CommentProps = {
  id: number;
  text: string;
  post: PostProps;
  user: ResponseUser;
  createdAt: string;
  updatedAt: string;
};
export type AnswerProps = {
  id: number;
  text: string;
  comment: CommentProps;
  user: ResponseUser;
  createdAt: string;
  updatedAt: string;
  post: PostProps;
};
