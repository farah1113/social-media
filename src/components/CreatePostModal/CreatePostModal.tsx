import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ImagePlus,
  X,
} from "lucide-react";

import {
  useMutation,
} from "@tanstack/react-query";

import {
  createPost,
} from "../../api/posts.api";

import "./CreatePostModal.css";


interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: () => void | Promise<void>;
}


export default function CreatePostModal({
  isOpen,
  onClose,
  onPostCreated,
}: CreatePostModalProps) {

  const [body, setBody] = useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState<string | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement>(null);


  /* =========================
     REMOVE IMAGE
  ========================= */

  function removeImage() {
    setImage(null);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }


  /* =========================
     RESET
  ========================= */

  function resetForm() {
    setBody("");
    removeImage();
  }


  /* =========================
     CLOSE
  ========================= */

  function handleClose() {
    if (createPostMutation.isPending) {
      return;
    }

    onClose();
  }


  /* =========================
     CREATE POST MUTATION
  ========================= */

  const createPostMutation =
    useMutation({
      mutationFn: createPost,

      onSuccess: async () => {
        resetForm();

        onClose();

        await onPostCreated();
      },

      onError: (error) => {
        console.error(
          "CREATE POST ERROR:",
          error
        );
      },
    });


  /* =========================
     IMAGE
  ========================= */

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(selectedFile);

    const previewUrl =
      URL.createObjectURL(selectedFile);

    setPreview(previewUrl);
  }


  /* =========================
     SUBMIT
  ========================= */

  function handleCreatePost() {
    if (!body.trim() && !image) {
      return;
    }

    createPostMutation.mutate({
      body,
      image,
    });
  }


  /* =========================
     ESCAPE TO CLOSE
  ========================= */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen]);


  /* =========================
     NOT OPEN
  ========================= */

  if (!isOpen) {
    return null;
  }


  const canSubmit =
    body.trim().length > 0 ||
    image !== null;


  return (
    <div
      className="create-modal-overlay"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          handleClose();
        }
      }}
    >

      <div
        className="create-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-post-title"
      >

        {/* =====================
            HEADER
        ====================== */}

        <div className="create-modal__header">

          <div>
            <span className="create-modal__eyebrow">
              NEW POST
            </span>

            <h2
              id="create-post-title"
              className="create-modal__title"
            >
              Create post
            </h2>
          </div>


          <button
            type="button"
            className="create-modal__close"
            onClick={handleClose}
            disabled={
              createPostMutation.isPending
            }
            aria-label="Close"
          >
            <X size={19} />
          </button>

        </div>


        {/* =====================
            BODY
        ====================== */}

        <div className="create-modal__body">

          {/* USER */}

          <div className="create-modal__user">

            <div className="create-modal__avatar">
              F
            </div>

            <div className="create-modal__user-info">
              <strong>
                Create something new
              </strong>

              <span>
                Public post
              </span>
            </div>

          </div>


          {/* TEXT */}

          <textarea
            className="create-modal__textarea"
            placeholder="What's on your mind?"
            value={body}
            onChange={(event) =>
              setBody(event.target.value)
            }
            autoFocus
          />


          {/* IMAGE PREVIEW */}

          {preview && (
            <div className="create-modal__preview">

              <img
                src={preview}
                alt="Post preview"
              />

              <button
                type="button"
                className="create-modal__remove-image"
                onClick={removeImage}
                disabled={
                  createPostMutation.isPending
                }
                aria-label="Remove image"
              >
                <X size={17} />
              </button>

            </div>
          )}


          {/* ATTACHMENT */}

          <div className="create-modal__attachment">

            <div className="create-modal__attachment-info">
              <strong>
                Add to your post
              </strong>

              <span>
                Add an optional photo
              </span>
            </div>


            <button
              type="button"
              className="create-modal__photo-button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              disabled={
                createPostMutation.isPending
              }
              aria-label="Add photo"
            >
              <ImagePlus size={20} />
            </button>


            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />

          </div>


          {/* ERROR */}

          {createPostMutation.isError && (
            <p className="create-modal__error">
              Couldn't create your post.
              Please try again.
            </p>
          )}

        </div>


        {/* =====================
            FOOTER
        ====================== */}

        <div className="create-modal__footer">

          <button
            type="button"
            className="create-modal__cancel"
            onClick={handleClose}
            disabled={
              createPostMutation.isPending
            }
          >
            Cancel
          </button>


          <button
            type="button"
            className="create-modal__submit"
            onClick={handleCreatePost}
            disabled={
              !canSubmit ||
              createPostMutation.isPending
            }
          >
            {createPostMutation.isPending
              ? "Posting..."
              : "Create post"}
          </button>

        </div>

      </div>

    </div>
  );
}