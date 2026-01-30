import React, { useState } from "react";
import ImageCropper from "./ImageCropper";

interface Props {
  size?: number;   
}

const AvatarUpload: React.FC<Props> = ({ size = 150}) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (cropped: string) => {
    setAvatar(cropped);
    setIsModalOpen(false);
  };

  const removeAvatar = () => setAvatar(null);

  return (
    <div style={{ textAlign: "center" }}>

      <div
        style={{
          position: "relative",
          width: size,
          margin: "50px auto",
        }}
      >

        <div
          onClick={() => document.getElementById("avatarInput")?.click()}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundColor: "#ddd",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            overflow: "hidden",
          }}
        >
          {avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <span>Загрузить</span>
          )}
        </div>


        {avatar && (
          <button
            onClick={removeAvatar}
            style={{
              position: "absolute",
              top: -6,
              right: 8,
              width: 24,
              height: 24,
              borderRadius: "50%",
              border: "none",
              backgroundColor: "#fff",
              cursor: "pointer",
              fontSize: 20,
              lineHeight: "24px",
            }}
          >
            ×
          </button>
        )}
      </div>

 
      <input
        id="avatarInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

 
      {isModalOpen && selectedFile && (
        <div
          onClick={() => setIsModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 8,
              maxWidth: 500,
            }}
          >
            <ImageCropper
              src={selectedFile}
              onCropComplete={handleCropComplete}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;
