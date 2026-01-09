"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useBuilder } from "@/context/builder-provider";
import { generateFormQuestionPrompt } from "@/lib/prompt";
import { chatWithAI } from "@/actions/gemini-ai";
import { WandSparkles } from "lucide-react";
import { FormBlockInstance } from "@/types/form.blocks.types";

export function AiGenerateBtn() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { formData, blocks, setBlocks } = useBuilder();

  const generateFormWithAi = async () => {
    try {
      setLoading(true);
      setError("");

      const formPrompt = generateFormQuestionPrompt(
        prompt,
        formData?.name || "",
        formData?.description || "",
        blocks
      );

      const result = await chatWithAI(formPrompt);

      if (result.success) {
        console.log("Form Data:", result.data);
        const actionType = result.data.actionType;
        if (actionType === "createForm") {
          const blocks = result.data.blocks as FormBlockInstance[];
          setBlocks([...blocks]);
        } else if (actionType === "addQuestions") {
          const blocks = result.data.blocks as FormBlockInstance[];
          setBlocks((prev) => [...prev, ...blocks]);
        }
        setIsOpen(false);
      } else {
        setError("An unexpected error occurred.");
      }
    } catch (e) {
      setError("An unexpected error occurred.");
      console.error(e);
    } finally {
      setPrompt("");
      setLoading(false);
      console.log({ blocks });
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={(e) => setIsOpen(e)}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <WandSparkles className="w-4 h-4" />
          <span className="hidden sm:inline">AI</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 space-y-3">
        <div className="text-sm font-medium">AI Prompt</div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <p>
            <strong>Tip:</strong> Start your prompt with:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>
              <strong>&quot;create&quot;</strong> - to generate a completely new
              form
            </li>
            <li>
              <strong>&quot;add question&quot;</strong> - to add questions to
              the existing form
            </li>
          </ul>
          <p className="text-destructive font-semibold">
            ⚠️ Warning: Using &quot;create&quot; will replace all existing form
            questions!
          </p>
        </div>

        <div className="text-destructive text-sm font-semibold">{error}</div>
        <Textarea
          placeholder="Type your prompt here..."
          required
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
          rows={4}
        />

        <Button
          className="w-full"
          disabled={loading}
          onClick={generateFormWithAi}
        >
          Send
        </Button>
      </PopoverContent>
    </Popover>
  );
}
