export type RegisterFormRequest = {
  email: string;
  username: string;
  password: string;
  avatarColor: string;
  avatarImage: string;
};

export type RegisterForm = {
  email: string;
  username: string;
  password: string;
};

export type LoginForm = {
  username: string;
  password: string;
  checkbox: boolean;
};
export type LoginFormRequest = {
  username: string;
  password: string;
};
