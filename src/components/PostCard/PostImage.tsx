import { useState } from "react";
import { ImageOff } from "lucide-react";

interface PostImageProps {
  src?: string;
  alt: string;
}

export default function PostImage({
  src,
  alt,
}: PostImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="post-image-fallback">
        <ImageOff size={24} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
    />
  );
}