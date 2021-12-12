import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

interface ImagePreviewProps {
  imageData: Uint8ClampedArray;
}

function ImagePreview({ imageData }: ImagePreviewProps) {
  const imageBlob = new Blob([imageData], { type: "image/png" });
  const imageUrl = URL.createObjectURL(imageBlob);

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
