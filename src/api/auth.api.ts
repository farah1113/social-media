import { api } from "./axios";
import type { RegisterFormData } from "../schemas/register.schema";
import type { LoginFormData } from "../schemas/login.schema";

export async function signup(data: RegisterFormData) {
  const response = await api.post("/users/signup", data);

  return response.data;
}

export async function signin(data: LoginFormData) {
  const response = await api.post("/users/signin", data);

  return response.data;
}