export interface PostUser {
  _id: string;
  name: string;
  username: string;
  photo?: string;
}

export interface Post {
  _id: string;
  id?: string;

  body?: string;
  image?: string;

  privacy: string;

  user: PostUser;

  sharedPost: Post | null;

  likes: unknown[];
  likesCount: number;

  commentsCount: number;
  sharesCount: number;

  bookmarked: boolean;
  isShare: boolean;

  createdAt: string;

  topComment?: unknown | null;
}

export interface GetAllPostsResponse {
  success: boolean;
  message: string;

  data: {
    posts: Post[];
  };

  meta: {
    pagination: {
      currentPage: number;
      numberOfPages: number;
      limit: number;
      nextPage?: number;
      total: number;
    };
  };
}