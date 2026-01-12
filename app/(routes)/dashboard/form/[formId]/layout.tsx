import Header from "../../_components/Header";

export default async function FormPagesLayout({
  children,
  params,
}: Readonly<{
  params: Promise<{ formId: string }>;
  children: React.ReactNode;
}>) {
  const { formId } = await params;
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header formId={formId} />
      <div className="w-full flex-1">{children}</div>
    </div>
  );
}
