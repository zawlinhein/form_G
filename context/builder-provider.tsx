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

  deleteBlock: (id: string) => void;
  copyBlock: (id: string) => void;
};

const BuilderContext = createContext<BuilderContextType | null>(null);

function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormWithSetting | null>(null);
  const [blocks, setBlocks] = useState<FormBlockInstance[]>([]);

  const deleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
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
        deleteBlock,
        copyBlock,
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
