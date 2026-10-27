import { useEffect, useState } from "react";

import {
  Image,
  Plus,
  Smile,
} from "lucide-react";

import { getAllPosts } from "../../api/posts.api";
import PostCard from "../../components/PostCard/PostCard";

import type { Post } from "../../types/post.types";

import "./Home.css";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        setIsLoading(true);
        setError("");

        const response = await getAllPosts();

        setPosts(response.data.posts);
      } catch (error) {
        console.error("GET ALL POSTS ERROR:", error);

        setError("Couldn't load posts.");
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <main className="home">
      <div className="home__layout">

        {/* =========================
            MAIN FEED
        ========================== */}

        <section className="home__main">

          {/* HEADER */}

          <header className="home__header">
            <div>
              <span className="home__eyebrow">
                COMMUNITY
              </span>

              <h1>Home</h1>

              <p>
                See what everyone is sharing.
              </p>
            </div>
          </header>


          {/* =========================
              STORIES
          ========================== */}

          <section className="stories">

            <button
              className="story story--add"
              type="button"
            >
              <span className="story__avatar story__avatar--add">
                <Plus size={19} />
              </span>

              <span>Your story</span>
            </button>


            <button
              className="story"
              type="button"
            >
              <span className="story__avatar">
                M
              </span>

              <span>Malak</span>
            </button>


            <button
              className="story"
              type="button"
            >
              <span className="story__avatar">
                S
              </span>

              <span>Sara</span>
            </button>


            <button
              className="story"
              type="button"
            >
              <span className="story__avatar">
                A
              </span>

              <span>Ahmed</span>
            </button>


            <button
              className="story"
              type="button"
            >
              <span className="story__avatar">
                N
              </span>

              <span>Nour</span>
            </button>


            <button
              className="story"
              type="button"
            >
              <span className="story__avatar">
                Y
              </span>

              <span>Youssef</span>
            </button>

          </section>


          {/* =========================
              CREATE POST
          ========================== */}

          <section className="create-post">

            <div className="create-post__top">

              <div className="create-post__avatar">
                F
              </div>

              <button
                type="button"
                className="create-post__input"
              >
                What's on your mind?
              </button>

            </div>


            <div className="create-post__bottom">

              <button type="button">
                <Image size={18} />
                <span>Photo</span>
              </button>


              <button type="button">
                <Smile size={18} />
                <span>Feeling</span>
              </button>


              <button
                type="button"
                className="create-post__button"
              >
                Create post
              </button>

            </div>

          </section>


          {/* =========================
              FEED TITLE
          ========================== */}

          <div className="feed-title">

            <div>
              <span className="feed-title__eyebrow">
                COMMUNITY FEED
              </span>

              <h2>Latest posts</h2>
            </div>


            <button type="button">
              Latest
            </button>

          </div>


          {/* =========================
              POSTS
          ========================== */}

          <div className="home__feed">

            {/* LOADING */}

            {isLoading && (
              <div className="feed-placeholder">
                <div className="feed-loader" />

                <p>
                  Loading posts...
                </p>
              </div>
            )}


            {/* ERROR */}

            {!isLoading && error && (
              <div className="feed-placeholder">
                <strong>
                  Something went wrong
                </strong>

                <p>
                  {error}
                </p>
              </div>
            )}


            {/* EMPTY */}

            {!isLoading &&
              !error &&
              posts.length === 0 && (
                <div className="feed-placeholder">
                  <strong>
                    No posts yet
                  </strong>

                  <p>
                    Be the first person to post something.
                  </p>
                </div>
              )}


            {/* REAL POSTS */}

            {!isLoading &&
              !error &&
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                />
              ))}

          </div>

        </section>


        {/* =========================
            RIGHT SIDEBAR
        ========================== */}

        <aside className="home__right">

          {/* PEOPLE */}

          <section className="right-card">

            <div className="right-card__heading">

              <div>
                <span>
                  DISCOVER
                </span>

                <h3>
                  People you may like
                </h3>
              </div>


              <button type="button">
                See all
              </button>

            </div>


            {/* USER */}

            <div className="suggested-user">

              <div className="suggested-user__avatar">
                M
              </div>

              <div className="suggested-user__info">
                <strong>
                  Malak
                </strong>

                <span>
                  @malak6
                </span>
              </div>

              <button type="button">
                Follow
              </button>

            </div>


            {/* USER */}

            <div className="suggested-user">

              <div className="suggested-user__avatar">
                S
              </div>

              <div className="suggested-user__info">
                <strong>
                  Sara
                </strong>

                <span>
                  @sara
                </span>
              </div>

              <button type="button">
                Follow
              </button>

            </div>


            {/* USER */}

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

          </section>


          {/* SMALL INFO CARD */}

          <section className="home-info-card">

            <span className="home-info-card__label">
              ROUTE POSTS
            </span>

            <h3>
              Share what's happening.
            </h3>

            <p>
              Connect, discover and join the conversation.
            </p>

          </section>


          <p className="home__copyright">
            Route Posts · Social media made simple
          </p>

        </aside>

      </div>
    </main>
  );
}