"use client";
import { FormWithSetting } from "@/database/schema";
import { generateId } from "@/lib/utils";
import { FormBlockInstance } from "@/types/form.blocks.types";
import { useParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

type BuilderContextType = {
  loading: boolean;
  formData: FormWithSetting | null;
  setFormData: React.Dispatch<React.SetStateAction<FormWithSetting | null>>;

  blocks: FormBlockInstance[];
  setBlocks: React.Dispatch<React.SetStateAction<FormBlockInstance[]>>;

  selectedBlock: FormBlockInstance | null;
  setSelectedBlock: React.Dispatch<
    React.SetStateAction<FormBlockInstance | null>
  >;

  deleteBlock: (id: string) => void;
  copyBlock: (id: string) => void;
  repositionBlock: (
    activeId: string,
    overId: string,
    position: "top" | "bottom"
  ) => void;

  isLastBlock: (id: string) => boolean;
};

const BuilderContext = createContext<BuilderContextType | null>(null);

function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormWithSetting | null>(null);
  const [blocks, setBlocks] = useState<FormBlockInstance[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<FormBlockInstance | null>(
    null
  );

  const isLastBlock = (id: string): boolean => {
    if (blocks[blocks.length - 1].id === id) return true;
    return false;
  };

  const deleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
    if (selectedBlock?.id === id) {
      setSelectedBlock(null);
    }
  };

  const repositionBlock = (
    activeId: string,
    overId: string,
    position: "top" | "bottom"
  ) => {
    setBlocks((prev) => {
      const overIndex = prev.findIndex((block) => block.id === overId);
      const activeIndex = prev.findIndex((block) => block.id === activeId);

      if (activeIndex === -1 || overIndex === -1) return prev;

      const newBlockArray = [...prev];
      const [activeBlock] = newBlockArray.splice(activeIndex, 1);
      if (!activeBlock) return prev;
      let insertIndex = overIndex;

      if (activeIndex < overIndex) {
        insertIndex -= 1;
      }

      if (position === "bottom") {
        insertIndex += 1;
      }

      newBlockArray.splice(insertIndex, 0, activeBlock);

      return newBlockArray;
    });
  };

  const copyBlock = (id: string) => {
    setBlocks((prev) => {
      const blockToCopy = prev.find((block) => block.id === id);
      if (!blockToCopy) return prev;

      const newBlockInstance: FormBlockInstance = {
        ...blockToCopy,
        id: generateId(),
        children: blockToCopy.children?.map((child) => ({
          ...child,
          id: generateId(),
        })),
      };
      const newBlocksArray = [...prev];
      const indexToAdd = prev.findIndex((block) => block.id === id) + 1;
      newBlocksArray.splice(indexToAdd, 0, newBlockInstance);
      return newBlocksArray;
    });
  };

  const params = useParams();
  const formId = params.formId as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!formId) return;
        const response = await fetch(`/api/form?formId=${formId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Fail to fetch form data");
        }
        const { data } = await response.json();
        if (data) {
          //console.log(data);
          setFormData(data);
          if (data.jsonBlocks) {
            const parsedBlocks = JSON.parse(data.jsonBlock);
            setBlocks(parsedBlocks);
          }
          setLoading(false);
        }
      } catch (e) {
        console.error("Error while fetching form:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [formId]);
  return (
    <BuilderContext
      value={{
        loading,
        formData,
        setFormData,
        blocks,
        setBlocks,
        selectedBlock,
        setSelectedBlock,
        deleteBlock,
        copyBlock,
        isLastBlock,
        repositionBlock,
      }}
    >
      {children}
    </BuilderContext>
  );
}

export default BuilderProvider;

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("Builder context error");
  }
  return context;
}
