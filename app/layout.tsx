import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import "@smastrom/react-rating/style.css";

export const dm_sans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Form Generator",
  description: "Form Generator lay pr byr!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${dm_sans.className}`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
