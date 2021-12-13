import { useEffect } from "react";

interface ImagePreviewProps {
  imageData: Blob;
}

function ImagePreview({ imageData }: ImagePreviewProps) {
  const imageUrl = URL.createObjectURL(imageData);

  useEffect(() => { 
    return () => { 
      URL.revokeObjectURL(imageUrl);
    }
  }, [imageUrl]);

  return (
    <div className="blur-sm mx-auto">
      <img
        alt="preview"
        src={imageUrl}
        className="object-contain max-h-96 max-w-96 mx-auto"
      />
    </div>
  );
}

export default ImagePreview;
