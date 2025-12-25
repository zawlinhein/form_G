"use client";
import { FormWithSetting } from "@/database/schema";
import { useParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

type BuilderContextType = {
  loading: boolean;
  formData: FormWithSetting | null;
  setFormData: React.Dispatch<React.SetStateAction<FormWithSetting | null>>;

  blocks: [];
  setBlocks: React.Dispatch<React.SetStateAction<[]>>;
};

const BuilderContext = createContext<BuilderContextType | null>(null);

function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormWithSetting | null>(null);
  const [blocks, setBlocks] = useState<any>([]);

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
          console.log(data);
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
      value={{ loading, formData, setFormData, blocks, setBlocks }}
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
