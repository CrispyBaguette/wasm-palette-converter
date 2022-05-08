import FileSaver from "file-saver";
import { useEffect } from "react";
import "./ImageOutput.css";

interface OutputProps {
  imageData: Blob;
}

function ImageOutput({ imageData }: OutputProps) {
  const imageUrl = URL.createObjectURL(imageData);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const handleClick = () => {
    const extension = imageData.type.split("/")[1];
    FileSaver.saveAs(imageData, `image.${extension}`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <img
        alt="dithering output"
        src={imageUrl}
        className="object-cover min-w-[70%] my-4 px-2 mx-auto"
      />
      <button
        onClick={handleClick}
        className={
          "block " +
          "w-48 " +
          "mx-auto " +
          "mt-1 " +
          "py-2 " +
          "px-4 " +
          "text-sm " +
          "text-center " +
          "text-nord-0 " +
          "dark:text-nord-5 " +
          "bg-nord-4 " +
          "dark:bg-nord-1 " +
          "hover:bg-nord-5 " +
          "dark:hover:bg-nord-2"
        }
      >
        Download
      </button>
      <a
        href={imageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={
          "block " +
          "w-48 " +
          "mx-auto " +
          "mt-1 " +
          "py-2 " +
          "px-4 " +
          "text-sm " +
          "text-center " +
          "text-nord-0 " +
          "dark:text-nord-5 " +
          "bg-nord-4 " +
          "dark:bg-nord-1 " +
          "hover:bg-nord-5 " +
          "dark:hover:bg-nord-2"
        }
      >
        Open in new tab
      </a>
    </div>
  );
}

export default ImageOutput;
