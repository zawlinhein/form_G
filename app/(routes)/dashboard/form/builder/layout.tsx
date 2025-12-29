"use client";
import BuilderProvider from "@/context/builder-provider";
import { DndContext } from "@dnd-kit/core";
import DragableOverlay from "../../_components/DragableOverlay";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DndContext>
      <BuilderProvider>
        <DragableOverlay />
        {children}
      </BuilderProvider>
    </DndContext>
  );
}
