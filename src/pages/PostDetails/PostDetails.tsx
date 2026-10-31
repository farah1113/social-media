    import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
} from "lucide-react";

import {
  getPostDetails,
} from "../../api/posts.api";

import type {
  Post,
} from "../../types/post.types";

import PostCard from "../../components/PostCard/PostCard";
import Comments from "../../components/Comments/Comments";

import "./PostDetails.css";


export default function PostDetails() {
  const { postId } = useParams();

  const navigate = useNavigate();


  const [post, setPost] =
    useState<Post | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =========================
     GET POST DETAILS
  ========================= */

  useEffect(() => {
    async function loadPostDetails() {
      if (!postId) {
        setError("Post ID is missing.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const response =
          await getPostDetails(postId);

        console.log(
          "POST DETAILS:",
          response
        );

        setPost(response.data.post);

      } catch (error) {
        console.error(
          "GET POST DETAILS ERROR:",
          error
        );

        setError(
          "Couldn't load this post."
        );

      } finally {
        setIsLoading(false);
      }
    }


    loadPostDetails();

  }, [postId]);


  /* =========================
     LOADING
  ========================= */

  if (isLoading) {
    return (
      <div className="post-details">
        Loading post...
      </div>
    );
  }


  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <div className="post-details">

        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <p>
          {error}
        </p>

      </div>
    );
  }


  /* =========================
     NO POST
  ========================= */

  if (!post) {
    return (
      <div className="post-details">
        Post not found.
      </div>
    );
  }


  /* =========================
     POST
  ========================= */

  return (
    <main className="post-details">

      <button
        type="button"
        className="post-details__back"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} />

        <span>
          Back
        </span>
      </button>


      <div className="post-details__header">

        <span>
          POST
        </span>

        <h1>
          Post details
        </h1>

      </div>


      <PostCard post={post} />

    </main>
  );
}