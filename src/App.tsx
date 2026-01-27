import React, { useState } from "react";
import ImageCropper from "./components/ImageCropper";
import "./App.css";

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setSelectedFile(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Редактор изображений</h1>

      <input className="inputs" type="file" accept="image/*" onChange={handleFileChange} />

      {selectedFile && (
        <ImageCropper
          src={selectedFile}
          onCropComplete={(cropped) => setCroppedImage(cropped)}
        />
      )}

      {croppedImage && (
        <div>
          <h2>Обрезанное изображение:</h2>
          <img src={croppedImage} alt="Cropped" />
        </div>
      )}
    </div>
  );
};

export default App;


