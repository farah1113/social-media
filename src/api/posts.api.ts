import { api } from "./axios";
import type { GetAllPostsResponse } from "../types/post.types";

export async function getAllPosts() {
  const { data } =
    await api.get<GetAllPostsResponse>("/posts");

  return data;
}