import {
  useEffect,
  useState,
} from "react";

import {
  Heart,
  MessageCircle,
} from "lucide-react";

import {
  getPostComments,
} from "../../api/posts.api";

import type {
  Comment,
} from "../../types/comment.types";

import "./Comments.css";


interface CommentsProps {
  postId: string;
}


export default function Comments({
  postId,
}: CommentsProps) {

  const [comments, setComments] =
    useState<Comment[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =========================
     GET COMMENTS
  ========================= */

  useEffect(() => {

    async function loadComments() {

      try {

        setIsLoading(true);
        setError("");

        const response =
          await getPostComments(postId);

        console.log(
          "POST COMMENTS:",
          response
        );

        setComments(
          response.data.comments
        );

      } catch (error) {

        console.error(
          "GET COMMENTS ERROR:",
          error
        );

        setError(
          "Couldn't load comments."
        );

      } finally {

        setIsLoading(false);

      }

    }


    loadComments();

  }, [postId]);


  /* =========================
     LOADING
  ========================= */

  if (isLoading) {

    return (
      <section className="comments">
        <p className="comments__status">
          Loading comments...
        </p>
      </section>
    );

  }


  /* =========================
     ERROR
  ========================= */

  if (error) {

    return (
      <section className="comments">
        <p className="comments__error">
          {error}
        </p>
      </section>
    );

  }


  /* =========================
     COMMENTS
  ========================= */

  return (
    <section className="comments">

      <div className="comments__header">

        <div>
          <span className="comments__eyebrow">
            DISCUSSION
          </span>

          <h2>
            Comments
          </h2>
        </div>


        <span className="comments__count">
          {comments.length}
        </span>

      </div>


      {comments.length === 0 ? (

        <div className="comments__empty">

          <MessageCircle size={24} />

          <strong>
            No comments yet
          </strong>

          <span>
            Be the first to comment.
          </span>

        </div>

      ) : (

        <div className="comments__list">

          {comments.map((comment) => (

            <CommentItem
              key={comment._id}
              comment={comment}
            />

          ))}

        </div>

      )}

    </section>
  );
}


/* =========================
   SINGLE COMMENT
========================= */

interface CommentItemProps {
  comment: Comment;
}


function CommentItem({
  comment,
}: CommentItemProps) {

  const [imageError, setImageError] =
    useState(false);


  const creator =
    comment.commentCreator;


  const initial =
    creator.name
      ?.trim()
      ?.charAt(0)
      .toUpperCase() || "?";


  const formattedDate =
    new Date(
      comment.createdAt
    ).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
      }
    );


  return (
    <article className="comment">

      {/* AVATAR */}

      <div className="comment__avatar-wrapper">

        {creator.photo && !imageError ? (

          <img
            className="comment__avatar"
            src={creator.photo}
            alt={creator.name}
            onError={() =>
              setImageError(true)
            }
          />

        ) : (

          <div className="comment__avatar-fallback">
            {initial}
          </div>

        )}

      </div>


      {/* COMMENT CONTENT */}

      <div className="comment__main">

        {/* PERSON */}

        <div className="comment__user">

          <strong>
            {creator.name}
          </strong>

          <span>
            @{creator.username}
          </span>

          <span className="comment__dot">
            •
          </span>

          <time>
            {formattedDate}
          </time>

        </div>


        {/* COMMENT */}

        <p className="comment__content">
          {comment.content}
        </p>


        {/* ACTIONS */}

        <div className="comment__actions">

          <button
            type="button"
          >
            <Heart size={15} />

            <span>
              Like
            </span>

            {comment.likes.length > 0 && (
              <span>
                {comment.likes.length}
              </span>
            )}

          </button>


          <button
            type="button"
          >
            <MessageCircle size={15} />

            <span>
              Reply
            </span>

            {comment.repliesCount > 0 && (
              <span>
                {comment.repliesCount}
              </span>
            )}

          </button>

        </div>

      </div>

    </article>
  );
}