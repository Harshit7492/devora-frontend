import { AppShell } from "@/components/layout/app-shell";

type InstanceLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{
    instance: string;
  }>;
}>;

export default async function InstanceLayout({ children, params }: InstanceLayoutProps) {
  const { instance } = await params;

  return <AppShell instance={instance}>{children}</AppShell>;
}
