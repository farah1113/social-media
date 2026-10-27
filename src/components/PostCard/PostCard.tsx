import { useState } from "react";

import {
  Bookmark,
  Heart,
  ImageOff,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
} from "lucide-react";

import type { Post } from "../../types/post.types";

import "./PostCard.css";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [avatarError, setAvatarError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [sharedImageError, setSharedImageError] = useState(false);

  const userInitial =
    post.user?.name?.trim()?.charAt(0).toUpperCase() || "?";

  const formattedDate = new Date(
    post.createdAt
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <article className="post-card">

      {/* HEADER */}

      <header className="post-card__header">

        <div className="post-card__author">

          {/* AVATAR */}

          {post.user?.photo && !avatarError ? (
            <img
              className="post-card__avatar"
              src={post.user.photo}
              alt={post.user.name || "User"}
              onError={() => setAvatarError(true)}
            />
          ) : (
            <div className="post-card__avatar-fallback">
              {userInitial}
            </div>
          )}


          {/* USER INFO */}

          <div className="post-card__author-info">

            <div className="post-card__author-name">

              <strong>
                {post.user?.name || "Unknown user"}
              </strong>

              {post.user?.username && (
                <span>
                  @{post.user.username}
                </span>
              )}

            </div>


            <div className="post-card__meta">

              <span>
                {formattedDate}
              </span>

              <span>•</span>

              <span className="post-card__privacy">
                {post.privacy}
              </span>

            </div>

          </div>

        </div>


        <button
          type="button"
          className="post-card__more"
          aria-label="Post options"
        >
          <MoreHorizontal size={20} />
        </button>

      </header>


      {/* BODY */}

      {post.body?.trim() && (
        <p className="post-card__body">
          {post.body.trim()}
        </p>
      )}


      {/* POST IMAGE */}

      {post.image && (
        <>
          {!imageError ? (
            <div className="post-card__media">

              <img
                src={post.image}
                alt="Post"
                loading="lazy"
                onError={() => setImageError(true)}
              />

            </div>
          ) : (
            <div className="post-card__media-unavailable">

              <ImageOff size={20} />

              <span>
                Image unavailable
              </span>

            </div>
          )}
        </>
      )}


      {/* SHARED POST */}

      {post.sharedPost && (
        <div className="post-card__shared">

          <div className="post-card__shared-header">

            <div className="post-card__shared-avatar">
              {post.sharedPost.user?.name
                ?.trim()
                ?.charAt(0)
                .toUpperCase() || "?"}
            </div>


            <div className="post-card__shared-user">

              <strong>
                {post.sharedPost.user?.name ||
                  "Unknown user"}
              </strong>

              {post.sharedPost.user?.username && (
                <span>
                  @{post.sharedPost.user.username}
                </span>
              )}

            </div>

          </div>


          {/* SHARED BODY */}

          {post.sharedPost.body?.trim() && (
            <p className="post-card__shared-body">
              {post.sharedPost.body.trim()}
            </p>
          )}


          {/* SHARED IMAGE */}

          {post.sharedPost.image && (
            <>
              {!sharedImageError ? (
                <div className="post-card__shared-media">

                  <img
                    src={post.sharedPost.image}
                    alt="Shared post"
                    loading="lazy"
                    onError={() =>
                      setSharedImageError(true)
                    }
                  />

                </div>
              ) : (
                <div className="post-card__shared-image-unavailable">

                  <ImageOff size={18} />

                  <span>
                    Image unavailable
                  </span>

                </div>
              )}
            </>
          )}

        </div>
      )}


      {/* ACTIONS */}

      <div className="post-card__actions">

        <div className="post-card__actions-left">

          {/* LIKE */}

          <button
            type="button"
            className="post-card__action"
            aria-label="Like"
          >
            <Heart size={22} />

            {post.likesCount > 0 && (
              <span>
                {post.likesCount}
              </span>
            )}
          </button>


          {/* COMMENT */}

          <button
            type="button"
            className="post-card__action"
            aria-label="Comment"
          >
            <MessageCircle size={22} />

            {post.commentsCount > 0 && (
              <span>
                {post.commentsCount}
              </span>
            )}
          </button>


          {/* SHARE */}

          <button
            type="button"
            className="post-card__action"
            aria-label="Share"
          >
            <Repeat2 size={21} />

            {post.sharesCount > 0 && (
              <span>
                {post.sharesCount}
              </span>
            )}
          </button>

        </div>


        {/* BOOKMARK */}

        <button
          type="button"
          className={`post-card__bookmark ${
            post.bookmarked
              ? "post-card__bookmark--active"
              : ""
          }`}
          aria-label="Bookmark"
        >
          <Bookmark size={21} />
        </button>

      </div>


      {/* COMMENTS */}

      {post.commentsCount > 0 && (
        <footer className="post-card__footer">

          <button type="button">
            View all {post.commentsCount}{" "}
            {post.commentsCount === 1
              ? "comment"
              : "comments"}
          </button>

        </footer>
      )}

    </article>
  );
}