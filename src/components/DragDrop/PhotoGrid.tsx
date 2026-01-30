import { DndContext, closestCenter } from "@dnd-kit/core";
import { useState, useMemo } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { arrayMove } from "../../utils/arrayMove";
import type { Photo } from "../../types/photo";
import { PhotoItem } from "./PhotoItem";
import { AddPhoto } from "./AddPhoto";

const MAX_PHOTOS = 9;

export function PhotoGrid() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const handleAdd = (photoFiles: FileList | File[]) => {
    const files = Array.from(photoFiles);
    const availableSlots = MAX_PHOTOS - photos.length;
    const filesToAdd = files.slice(0, availableSlots);
    

    const newPhotos: Photo[] = filesToAdd.map((file) => ({
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file),
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const handleDelete = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = photos.findIndex((p) => p.id === active.id);
    const newIndex = photos.findIndex((p) => p.id === over.id);

    setPhotos(arrayMove(photos, oldIndex, newIndex));
  };

  const slots = useMemo<(Photo | "add" | null)[]>(() => {
  const baseSlots = [
    ...photos.slice(0, MAX_PHOTOS),
    ...Array(Math.max(0, MAX_PHOTOS - photos.length)).fill(null),
  ];

  const firstEmptyIndex = baseSlots.findIndex((s) => s === null);
  if (firstEmptyIndex !== -1) {
    baseSlots[firstEmptyIndex] = "add";
  }

  return baseSlots;
}, [photos]);


  const sortableIds = photos.map((p) => p.id);

  return (
    <div style={{ padding: 20 }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h1 style={headerStyle}>Загрузите фото</h1>
        <p style={subtitleStyle}>
          Качественные фото привлекают больше внимания к вашему объявлению. Максимум 9 фото (максимум 9 фото).
        </p>
      </div>    

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <SortableContext
          items={sortableIds}
          strategy={rectSortingStrategy}
        >
          <div style={gridStyle}>
            {slots.map((slot, idx) => {
              if (!slot) {
                return (
                  <div key={`placeholder-${idx}`} style={placeholderStyle}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3914/3914361.png"
                      alt="Placeholder"
                      style={{ width: 20, height: 20, opacity: 0.5 }}
                    />
                  </div>
                );
              }

              if (slot === "add") {
                return (
                  <AddPhoto
                    key={`add-${idx}`}
                    onAdd={handleAdd}
                    iconUrl="https://cdn-icons-png.flaticon.com/128/3917/3917207.png"
                    iconStyle={{ width: 20, height: 20, opacity: 0.5 }}
                  />
                );
              }

              return (
                <PhotoItem
                  key={slot.id}
                  photo={slot}
                  onDelete={handleDelete}
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>


    </div>
  );
}

const gridStyle: React.CSSProperties = {
  margin: "0 auto",
  width: "100%",
  maxWidth: 768,
  display: "grid",
  background: "#fafafa",
  gridTemplateColumns: "repeat(auto-fill, 200px)",
  gap: 20,
  justifyContent: "center",
  boxSizing: "border-box",
};

const placeholderStyle: React.CSSProperties = {
  width: 200,
  height: 200,
  borderRadius: 8,
  background: "#f0f0f0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px dashed #ccc",
  boxSizing: "border-box",
};

const headerStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 24,
  textAlign: "center",
  width: "100%",
  maxWidth: 768,
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: 20,
};

const subtitleStyle: React.CSSProperties = {
  margin: "8px 0 20px 0",
  fontSize: 16,
  color: "#555",
  textAlign: "center",
  width: "100%",
  maxWidth: 768,
  marginLeft: "auto",
  marginRight: "auto",
};
