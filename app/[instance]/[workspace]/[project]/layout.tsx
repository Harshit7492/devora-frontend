import { ProjectShell } from "@/components/layout/project-shell";

type ProjectLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{
    instance: string;
    workspace: string;
    project: string;
  }>;
}>;

export default async function ProjectLayout({ children, params }: ProjectLayoutProps) {
  const route = await params;

  return (
    <ProjectShell {...route}>{children}</ProjectShell>
  );
}
