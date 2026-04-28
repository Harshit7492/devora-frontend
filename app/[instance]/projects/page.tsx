import { ProjectsList } from "@/components/modules/project/projects-list";

type ProjectsPageProps = {
  params: Promise<{
    instance: string;
  }>;
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { instance } = await params;

  return (
    <div className="min-h-[calc(100vh-12rem)] rounded-[2rem] bg-[#0d1417] px-6 py-10 text-[#f5efe5] shadow-[0_30px_120px_rgba(7,10,11,0.35)] sm:px-8 lg:px-10">
      <ProjectsList instance={instance} />
    </div>
  );
}
