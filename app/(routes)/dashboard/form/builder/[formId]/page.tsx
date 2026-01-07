"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Save, Send } from "lucide-react";
import { dummyFormFields } from "@/constants";
import { formBlocks } from "@/lib/blocks";
import BlockBtn from "@/components/common/BlockBtn";
import { useBuilder } from "@/context/builder-provider";
import FullContent from "../../../_components/FullContent";
import MainContext from "../../../_components/MainContext";
import BuilderProperties from "../../../_components/BuilderProperties";
import Preview from "../../../_components/Preview";

export default function BuilderPage() {
  const { formData } = useBuilder();
  const isPublished = formData?.published;
  const layoutBlocks = Object.values(formBlocks).filter(
    (block) => block.blockCategory === "Layout"
  );
  const fieldBlocks = Object.values(formBlocks).filter(
    (block) => block.blockCategory === "Field"
  );
  const [activeTab, setActiveTab] = useState("blocks");

  return (
    <>
      <div className="bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex items-center justify-between py-3">
              <TabsList className="bg-muted/50">
                <TabsTrigger value="blocks">Blocks</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Preview />
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                >
                  <Save className="w-4 h-4" />
                  <span className="hidden sm:inline">Save</span>
                </Button>
                <Button
                  size="sm"
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Publish</span>
                </Button>
              </div>
            </div>

            <TabsContent value="blocks" className="mt-0 pb-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {layoutBlocks.map((block) => (
                  <BlockBtn
                    key={block.blockType}
                    formBlock={block}
                    disabled={isPublished ?? false}
                  />
                ))}
                {fieldBlocks.map((block) => (
                  <BlockBtn
                    key={block.blockType}
                    formBlock={block}
                    disabled={isPublished ?? false}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-0 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Form Title</label>
                  <input
                    type="text"
                    defaultValue="Customer Satisfaction Survey"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Form Type</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>Survey</option>
                    <option>Contact Form</option>
                    <option>Registration</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Main Content Area */}
      <MainContext />
    </>
  );
}
