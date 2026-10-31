import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Image,
  Smile,
} from "lucide-react";

import {
  getAllPosts,
} from "../../api/posts.api";

import type {
  Post,
} from "../../types/post.types";

import PostCard from "../../components/PostCard/PostCard";
import CreatePostModal from "../../components/CreatePostModal/CreatePostModal";

import "./Home.css";


export default function Home() {
  /* =========================
     POSTS STATE
  ========================= */

  const [posts, setPosts] =
    useState<Post[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =========================
     CREATE POST MODAL STATE
  ========================= */

  const [
    isCreatePostOpen,
    setIsCreatePostOpen,
  ] = useState(false);


  /* =========================
     GET ALL POSTS
  ========================= */

  const loadPosts =
    useCallback(async () => {
      try {
        setIsLoading(true);

        setError("");

        const response =
          await getAllPosts();

        setPosts(
          response.data.posts
        );
      } catch (error) {
        console.error(
          "GET ALL POSTS ERROR:",
          error
        );

        setError(
          "Couldn't load posts."
        );
      } finally {
        setIsLoading(false);
      }
    }, []);


  /* =========================
     LOAD POSTS ON PAGE OPEN
  ========================= */

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);


  /* =========================
     MODAL FUNCTIONS
  ========================= */

  function openCreatePostModal() {
    setIsCreatePostOpen(true);
  }


  function closeCreatePostModal() {
    setIsCreatePostOpen(false);
  }


  /* =========================
     JSX
  ========================= */

  return (
    <>
      <main className="home">

        {/* =====================
            MAIN FEED
        ====================== */}

        <section className="home__feed">

          {/* =====================
              HEADER
          ====================== */}

          <div className="home__header">

            <div>
              <span className="home__eyebrow">
                YOUR FEED
              </span>

              <h1>
                Home
              </h1>
            </div>

          </div>


          {/* =====================
              STORIES
          ====================== */}

          <section className="stories">

            <button
              type="button"
              className="story"
            >
              <div className="story__avatar">
                F
              </div>

              <span>
                Your story
              </span>
            </button>


            <button
              type="button"
              className="story"
            >
              <div className="story__avatar">
                A
              </div>

              <span>
                Ahmed
              </span>
            </button>


            <button
              type="button"
              className="story"
            >
              <div className="story__avatar">
                M
              </div>

              <span>
                Mariam
              </span>
            </button>


            <button
              type="button"
              className="story"
            >
              <div className="story__avatar">
                S
              </div>

              <span>
                Sara
              </span>
            </button>

          </section>


          {/* =====================
              CREATE POST CARD
          ====================== */}

          <section className="create-post">

            <div className="create-post__top">

              <div className="create-post__avatar">
                F
              </div>


              <button
                type="button"
                className="create-post__input"
                onClick={openCreatePostModal}
              >
                What's on your mind?
              </button>

            </div>


            <div className="create-post__bottom">

              {/* PHOTO */}

              <button
                type="button"
                onClick={openCreatePostModal}
              >
                <Image size={18} />

                <span>
                  Photo
                </span>
              </button>


              {/* FEELING */}

              <button
                type="button"
                onClick={openCreatePostModal}
              >
                <Smile size={18} />

                <span>
                  Feeling
                </span>
              </button>


              {/* CREATE */}

              <button
                type="button"
                className="create-post__button"
                onClick={openCreatePostModal}
              >
                Create post
              </button>

            </div>

          </section>


          {/* =====================
              FEED TITLE
          ====================== */}

          <div className="feed-title">

            <div>
              <span>
                LATEST
              </span>

              <h2>
                Recent posts
              </h2>
            </div>

            <button
              type="button"
              onClick={loadPosts}
            >
              Refresh
            </button>

          </div>


          {/* =====================
              LOADING
          ====================== */}

          {isLoading && (

            <div className="home__status">
              Loading posts...
            </div>

          )}


          {/* =====================
              ERROR
          ====================== */}

          {!isLoading && error && (

            <div className="home__status home__status--error">

              <p>
                {error}
              </p>

              <button
                type="button"
                onClick={loadPosts}
              >
                Try again
              </button>

            </div>

          )}


          {/* =====================
              POSTS
          ====================== */}

          {!isLoading &&
            !error &&
            posts.map((post) => (

              <PostCard
                key={post._id}
                post={post}
              />

            ))}


          {/* =====================
              EMPTY
          ====================== */}

          {!isLoading &&
            !error &&
            posts.length === 0 && (

              <div className="home__status">

                <p>
                  No posts yet.
                </p>

                <button
                  type="button"
                  onClick={openCreatePostModal}
                >
                  Create your first post
                </button>

              </div>

            )}

        </section>


        {/* =====================
            RIGHT SIDEBAR
        ====================== */}

        <aside className="home__right">

          <div className="right-card">

            <span className="right-card__eyebrow">
              DISCOVER
            </span>

            <h3>
              People you may know
            </h3>


            <div className="suggested-user">

              <div className="suggested-user__avatar">
                A
              </div>


              <div className="suggested-user__info">

                <strong>
                  Ahmed
                </strong>

                <span>
                  @ahmed
                </span>

              </div>


              <button type="button">
                Follow
              </button>

            </div>


            <div className="suggested-user">

              <div className="suggested-user__avatar">
                M
              </div>


              <div className="suggested-user__info">

                <strong>
                  Mariam
                </strong>

                <span>
                  @mariam
                </span>

              </div>


              <button type="button">
                Follow
              </button>

            </div>

          </div>


          <div className="right-card">

            <span className="right-card__eyebrow">
              ROUTE POSTS
            </span>

            <h3>
              Join the conversation.
            </h3>

            <p>
              Share moments, connect with people,
              and discover what's happening.
            </p>

            <small>
              Route Posts · Social media made simple
            </small>

          </div>

        </aside>

      </main>


      {/* =========================
          CREATE POST MODAL

          IMPORTANT:
          Keep this OUTSIDE .home
      ========================= */}

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={closeCreatePostModal}
        onPostCreated={loadPosts}
      />

    </>
  );
}