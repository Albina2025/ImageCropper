import React, { useState, useRef } from "react";
import ReactCrop, {type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { cropImageToCanvas } from "../../utils/cropImageToCanvas";

interface Props {
  src: string;
  onCropComplete: (img: string) => void;
}

const ImageCropper: React.FC<Props> = ({ src, onCropComplete }) => {
  const [crop, setCrop] = useState<PixelCrop>({
    unit: "px",
    x: 0,
    y: 0,
    width: 200,
    height: 200
  });

  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleCrop = () => {
    if (!imgRef.current) return;

    const result = cropImageToCanvas(
      imgRef.current,
      crop,
      rotation,
      zoom
    );

    onCropComplete(result);
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <ReactCrop crop={crop} onChange={setCrop}  onComplete={setCrop}>  {/*aspect={1} */}
        <img
          ref={imgRef}
          src={src}
          alt="Crop"
          style={{
            maxWidth: "100%", 
            transform: `scale(${zoom}) rotate(${rotation}deg)`
          }}
        />
      </ReactCrop>

   
      <div style={{ marginTop: 12 }}>
        <label>
          Rotate:
          <input
            type="range"
            min={0}
            max={360}
            value={rotation}
            onChange={(e) => setRotation(+e.target.value)}
          />
        </label>

        <label>
          Zoom:
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(+e.target.value)}
          />
        </label>
      </div>

      <button onClick={handleCrop}>
        Кыркып алуу
      </button>
    </div>
  );
};

export default ImageCropper;



