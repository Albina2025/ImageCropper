import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Photo } from "../../types/photo";

type Props = {
  photo: Photo;
  onDelete: (id: string) => void;
};

export function PhotoItem({ photo, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: photo.id });

  const style: React.CSSProperties = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...itemStyle, ...style }}
      {...attributes}
      {...listeners}
    >
      <button
        style={deleteBtn}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(photo.id);
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        ✕
      </button>
      <img src={photo.url} alt="" style={imgStyle} />
    </div>
  );
}

const itemStyle: React.CSSProperties = {
  width: 200,
  height: 200,
  position: "relative",
  borderRadius: 8,
  background: "#ddd",
  touchAction: "none",
  boxSizing: "border-box",
};

const imgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: 8,
};

const deleteBtn: React.CSSProperties = {
  position: "absolute",
  top: 4,
  right: 4,
  zIndex: 2,
  cursor: "pointer",
  background: "rgba(0,0,0,0.5)",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: 24,
  height: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
