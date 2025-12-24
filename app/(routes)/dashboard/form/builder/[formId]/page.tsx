"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Eye,
  Save,
  Send,
  Type,
  AlignLeft,
  Mail,
  Phone,
  Calendar,
  List,
  CheckSquare,
  Circle,
  Star,
  ImageIcon,
  GripVertical,
  Settings,
  Trash2,
  Plus,
  X,
} from "lucide-react";
import { dummyFormFields } from "@/constants";

// Dummy form blocks data
const formBlocks = [
  { id: "heading", icon: Type, label: "Heading", type: "text" },
  { id: "paragraph", icon: AlignLeft, label: "Paragraph", type: "text" },
  { id: "text-input", icon: Type, label: "Text Input", type: "input" },
  { id: "email", icon: Mail, label: "Email", type: "input" },
  { id: "phone", icon: Phone, label: "Phone", type: "input" },
  { id: "date", icon: Calendar, label: "Date", type: "input" },
  { id: "dropdown", icon: List, label: "Dropdown", type: "input" },
  { id: "checkbox", icon: CheckSquare, label: "Checkbox", type: "input" },
  { id: "radio", icon: Circle, label: "Radio", type: "input" },
  { id: "rating", icon: Star, label: "Star Rating", type: "input" },
  { id: "image", icon: ImageIcon, label: "Image", type: "media" },
];

export default function BuilderPage() {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("blocks");

  const selectedFieldData = dummyFormFields.find(
    (field) => field.id === selectedField
  );

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
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Preview</span>
                </Button>
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
                {formBlocks.map((block) => (
                  <button
                    key={block.id}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-card hover:bg-accent hover:border-accent-foreground/20 transition-all hover:shadow-md"
                  >
                    <block.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-xs font-medium text-center">
                      {block.label}
                    </span>
                  </button>
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
      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex">
        {/* Left Panel - Blocks Toolbar */}
        <div className="hidden lg:flex w-64 border-r border-border bg-card/50 backdrop-blur-sm flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground mb-2">Add Blocks</h3>
            <input
              type="text"
              placeholder="Search blocks..."
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-muted-foreground mb-3">
                LAYOUT
              </div>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-accent hover:border-accent-foreground/20 transition-all">
                <AlignLeft className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">Row Layout</span>
              </button>

              <div className="text-xs font-semibold text-muted-foreground mb-3 mt-6">
                FORM ELEMENTS
              </div>
              {formBlocks.map((block) => (
                <button
                  key={block.id}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-accent hover:border-accent-foreground/20 transition-all"
                >
                  <block.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium">{block.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Canvas Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Form Preview Card */}
            <div className="bg-card/80 backdrop-blur-sm rounded-lg border border-border shadow-lg overflow-hidden">
              {/* Hero Image */}
              <div className="h-32 sm:h-40 bg-gradient-to-r from-primary/20 via-accent/30 to-secondary/20 relative">
                <div className="absolute inset-0 bg-[url('/abstract-geometric-flow.png')] bg-cover bg-center opacity-50" />
              </div>

              {/* Form Content */}
              <div className="p-6 sm:p-8 space-y-6">
                {dummyFormFields.map((field) => (
                  <div
                    key={field.id}
                    className={`group relative ${
                      selectedField === field.id
                        ? "ring-2 ring-primary rounded-lg"
                        : ""
                    }`}
                    onClick={() => setSelectedField(field.id)}
                  >
                    {/* Drag Handle */}
                    <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                      <GripVertical className="w-5 h-5 text-muted-foreground" />
                    </div>

                    {/* Field Content */}
                    {field.type === "heading" && (
                      <div className="border border-transparent hover:border-border rounded-lg p-4 transition-colors">
                        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                          {field.content}
                        </h1>
                      </div>
                    )}

                    {field.type === "paragraph" && (
                      <div className="border border-transparent hover:border-border rounded-lg p-4 transition-colors">
                        <p className="text-muted-foreground leading-relaxed">
                          {field.content}
                        </p>
                      </div>
                    )}

                    {field.type === "text-input" && (
                      <div className="space-y-3 border border-transparent hover:border-border rounded-lg p-4 transition-colors">
                        <label className="block font-medium text-foreground">
                          {field.label}
                          {field.required && (
                            <span className="text-destructive ml-1">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    )}

                    {field.type === "email" && (
                      <div className="space-y-3 border border-transparent hover:border-border rounded-lg p-4 transition-colors">
                        <label className="block font-medium text-foreground">
                          {field.label}
                        </label>
                        <input
                          type="email"
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    )}

                    {field.type === "radio" && (
                      <div className="space-y-3 border border-transparent hover:border-border rounded-lg p-4 transition-colors">
                        <label className="block font-medium text-foreground">
                          {field.label}
                          {field.required && (
                            <span className="text-destructive ml-1">*</span>
                          )}
                        </label>
                        <div className="space-y-3">
                          {field.options?.map((option, idx) => (
                            <label
                              key={idx}
                              className="flex items-center gap-3 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name={field.id}
                                className="w-4 h-4 text-primary border-input focus:ring-ring"
                              />
                              <span className="text-foreground">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {field.type === "rating" && (
                      <div className="space-y-3 border border-transparent hover:border-border rounded-lg p-4 transition-colors">
                        <label className="block font-medium text-foreground">
                          {field.label}
                          {field.required && (
                            <span className="text-destructive ml-1">*</span>
                          )}
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              className="p-2 rounded hover:bg-accent transition-colors"
                            >
                              <Star className="w-6 h-6 text-muted-foreground hover:text-primary hover:fill-primary transition-colors" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Field Actions */}
                    {selectedField === field.id && (
                      <div className="absolute -right-2 top-2 flex gap-1 bg-card border border-border rounded-lg shadow-lg p-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                <button className="w-full py-4 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-accent/50 transition-all group">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground group-hover:text-primary">
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Add New Field</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Helper Text */}
            <div className="text-center mt-6 text-sm text-muted-foreground">
              <p>
                Click on any field to edit or add new blocks from the toolbar
                above
              </p>
            </div>
          </div>
        </div>

        {selectedField ? (
          <div className="w-80 border-l border-border bg-card/50 backdrop-blur-sm flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Block Settings</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setSelectedField(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-6">
              {/* Block Type */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">
                  BLOCK TYPE
                </label>
                <div className="text-sm font-medium text-foreground capitalize">
                  {selectedFieldData?.type?.replace("-", " ")}
                </div>
              </div>

              {/* Label */}
              {selectedFieldData?.label && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground">
                    LABEL
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedFieldData.label}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              )}

              {/* Content (for heading/paragraph) */}
              {selectedFieldData?.content && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground">
                    CONTENT
                  </label>
                  <textarea
                    defaultValue={selectedFieldData.content}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
              )}

              {/* Placeholder */}
              {selectedFieldData?.placeholder && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground">
                    PLACEHOLDER
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedFieldData.placeholder}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              )}

              {/* Required Toggle */}
              {selectedFieldData && "required" in selectedFieldData && (
                <div className="space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-semibold text-muted-foreground">
                      REQUIRED
                    </span>
                    <input
                      type="checkbox"
                      defaultChecked={selectedFieldData.required}
                      className="w-4 h-4 rounded border-input text-primary focus:ring-ring"
                    />
                  </label>
                </div>
              )}

              {/* Options (for radio/dropdown) */}
              {selectedFieldData?.options && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground">
                    OPTIONS
                  </label>
                  <div className="space-y-2">
                    {selectedFieldData.options.map((option, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          defaultValue={option}
                          className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 bg-transparent"
                    >
                      <Plus className="w-4 h-4" />
                      Add Option
                    </Button>
                  </div>
                </div>
              )}

              {/* Advanced Settings */}
              <div className="pt-4 border-t border-border space-y-4">
                <div className="text-xs font-semibold text-muted-foreground">
                  ADVANCED
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Field ID
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedFieldData?.id}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    CSS Class
                  </label>
                  <input
                    type="text"
                    placeholder="custom-class"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Delete Block */}
              <div className="pt-4">
                <Button variant="destructive" className="w-full gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete Block
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden xl:flex w-80 border-l border-border bg-card/50 backdrop-blur-sm flex-col items-center justify-center p-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                <Settings className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">
                No Block Selected
              </h3>
              <p className="text-sm text-muted-foreground">
                Click on any block in the canvas to modify its properties
              </p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
