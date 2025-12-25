import Header from "./_components/Header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className="w-full flex-1">{children}</div>
    </div>
  );
}
