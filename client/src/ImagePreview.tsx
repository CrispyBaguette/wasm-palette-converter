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
    <div className="blur-sm max-w-4xl mx-auto">
      <img
        alt="preview"
        src={imageUrl}
        className="object-cover min-w-[70%] my-4 px-2 mx-auto"
      />
    </div>
  );
}

export default ImagePreview;
