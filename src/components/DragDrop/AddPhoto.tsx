import React from "react";

type AddPhotoProps = {
  onAdd: (files: FileList | File[]) => void;
  iconUrl?: string;
  iconStyle?: React.CSSProperties;
};

export function AddPhoto({ onAdd, iconUrl, iconStyle }: AddPhotoProps) {
  return (
    <label style={addPhotoContainer}>
      <input
        type="file"
        multiple
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={(e) => {
          if (!e.target.files) return;
          onAdd(e.target.files);
          e.target.value = "";
        }}
      />
      {iconUrl && (
        <img
          src={iconUrl}
          alt="Add"
          style={{ width: 25, height: 25, opacity: 0.5, ...iconStyle }}
        />
      )}
    </label>
  );
}

const addPhotoContainer: React.CSSProperties = {
    width: 200,
    height: 200,
    borderRadius: 8,
    backgroundColor: "#fff", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "2px dashed #ccc",
    boxSizing: "border-box",
};
