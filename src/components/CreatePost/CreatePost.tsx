import {
  ImagePlus,
  Send,
} from "lucide-react";

import "./CreatePost.css";

export default function CreatePost() {
  return (
    <section className="create-post">

      <div className="create-post__main">
        <div className="create-post__avatar">
          Y
        </div>

        <button
          type="button"
          className="create-post__prompt"
        >
          What's on your mind?
        </button>
      </div>

      <div className="create-post__footer">

        <button type="button">
          <ImagePlus size={19} />
          Photo / video
        </button>

        <button
          type="button"
          className="create-post__button"
        >
          Post
          <Send size={16} />
        </button>

      </div>

    </section>
  );
}