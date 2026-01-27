import {type PixelCrop } from "react-image-crop";

export function cropImageToCanvas(
  image: HTMLImageElement,
  crop: PixelCrop,
  rotation: number,
  zoom: number
): string {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.scale(zoom, zoom);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return canvas.toDataURL("image/jpeg");
}
