import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

interface ImagePreviewProps {
  imageData: Blob;
}

function ImagePreview({ imageData }: ImagePreviewProps) {
  const imageUrl = URL.createObjectURL(imageData);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        <img
          alt="preview"
          src={imageUrl}
          className="blur-sm object-cover min-w-[70%] my-4 px-2 mx-auto"
        />
        <div className="absolute inset-1/2 -translate-y-12 -translate-x-12 w-24 h-24">
          <FontAwesomeIcon
            icon={faSpinner}
            className="absolute animate-spin text-8xl"
          />
        </div>
      </div>
    </div>
  );
}

export default ImagePreview;
