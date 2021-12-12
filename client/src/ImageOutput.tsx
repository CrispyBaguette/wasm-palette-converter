import FileSaver from "file-saver";
import "./ImageOutput.css";

interface OutputProps {
  imageData: Uint8ClampedArray;
}

function ImageOutput({ imageData }: OutputProps) {
  const imageBlob = new Blob([imageData], { type: "image/png" });
  const imageUrl = URL.createObjectURL(imageBlob);

  const handleClick = () => {
    FileSaver.saveAs(imageBlob, "image.png");
  };

  return (
    <div className="mx-auto">
      <img
        alt="dithering output"
        src={imageUrl}
        className="object-contain max-h-96 max-w-96 mx-auto"
      />
      <button
        onClick={handleClick}
        className="block w-48 mx-auto mt-1 py-2 px-4 text-sm text-nord-0 bg-nord-4 hover:bg-nord-5"
      >
        Download
      </button>
      <a
        href={imageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-48 mx-auto mt-1 py-2 px-4 text-sm text-nord-0 bg-nord-4 hover:bg-nord-5"
      >
        Open in new tab
      </a>
    </div>
  );
}

export default ImageOutput;
