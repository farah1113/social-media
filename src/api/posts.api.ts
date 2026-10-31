import { api } from "./axios";
import type { GetAllPostsResponse } from "../types/post.types";
import type {
  GetPostCommentsResponse,
} from "../types/comment.types";

export async function getAllPosts() {
  const { data } =
    await api.get<GetAllPostsResponse>("/posts");

  return data;
}
export async function getPostDetails(postId: string) {
  const { data } = await api.get(`/posts/${postId}`);

  return data;
}
export interface CreatePostData {
  body: string;
  image: File | null;
}


export async function createPost({
  body,
  image,
}: CreatePostData) {

  const formData = new FormData();

  if (body.trim()) {
    formData.append(
      "body",
      body.trim()
    );
  }

  if (image) {
    formData.append(
      "image",
      image
    );
  }

  const { data } = await api.post(
    "/posts",
    formData
  );

  return data;
}
export async function getPostComments(
  postId: string,
  page = 1,
  limit = 10
) {
  const { data } = await api.get(
    `/posts/${postId}/comments`,
    {
      params: {
        page,
        limit,
      },
    }
  );

  return data;
}
