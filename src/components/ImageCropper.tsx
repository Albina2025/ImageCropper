import React, { useState, useRef } from "react";
import ReactCrop, { type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface Props {
  src: string;
  onCropComplete: (img: string) => void;
}

const ImageCropper: React.FC<Props> = ({ src, onCropComplete }) => {
  const [crop, setCrop] = useState<PixelCrop>({
    unit: "px",
    x: 0,
    y: 0,
    width: 150,
    height: 150
  });

  const imgRef = useRef<HTMLImageElement | null>(null);

  const getCroppedImage = () => {
    if (!imgRef.current) return;

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      imgRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    onCropComplete(canvas.toDataURL("image/jpeg"));
  };

  return (
    <div>
      <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={1}>
        <img
          ref={imgRef}
          src={src}
          alt="Crop"
        />
      </ReactCrop>

      <button onClick={getCroppedImage}>
        Кыркып алуу
      </button>
    </div>
  );
};

export default ImageCropper;

