import BuilderProvider from "@/context/builder-provider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BuilderProvider>{children}</BuilderProvider>;
}
