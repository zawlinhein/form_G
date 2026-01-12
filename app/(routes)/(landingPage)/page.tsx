"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  Sparkles,
  LayoutGrid,
  Share2,
  BarChart3,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const features = [
    {
      icon: LayoutGrid,
      title: "Drag & Drop",
      description: "Build forms easily with drag-and-drop components",
      delay: 0.1,
    },
    {
      icon: Sparkles,
      title: "AI Generation",
      description: "Generate forms instantly with AI",
      delay: 0.2,
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share public links and collect responses",
      delay: 0.3,
    },
    {
      icon: BarChart3,
      title: "Response Tracking",
      description: "View and analyze form responses",
      delay: 0.4,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <div className="container mx-auto px-6 py-16">
          {/* Hero Section */}
          <motion.div
            className="max-w-4xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Create Forms in Minutes
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A simple form builder with drag-and-drop, AI generation, and
              response tracking
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started
              </Button>
            </Link>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
              >
                <Card className="p-6 text-center border hover:border-primary/50 transition-colors h-full">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <h3 className="font-bold text-lg mb-2">Form Generator</h3>
              <p className="text-sm text-muted-foreground">
                Create beautiful forms with ease
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-foreground transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-foreground transition-colors"
                  >
                    Create Form
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <div className="flex gap-4">
                <a
                  href="mailto:contact@formgenerator.com"
                  className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4 text-primary" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4 text-primary" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4 text-primary" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
            <p>© 2026 Form Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
