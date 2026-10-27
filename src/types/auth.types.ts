export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  username?: string;
  email: string;
  dateOfBirth: string;
  gender: "male" | "female";
  password: string;
  rePassword: string;
}



export interface AuthUser {
  _id: string;
  name: string;
}

export interface AuthData {
  expiresIn: string;
  token: string;
  tokenType: string;
  user: AuthUser;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: AuthData;
}