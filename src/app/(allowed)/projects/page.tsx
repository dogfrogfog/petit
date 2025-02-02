import { ProjectsList } from "@/components/projects-list";
import { getProjectsData } from "@/lib/actions/project-data";
import { auth } from "@clerk/nextjs/server";

export default async function Projects() {
  const { userId } = await auth();
  const projects = await getProjectsData();

  return (
    <div className="space-y-4 flex-1 px-4 md:px-6 mx-auto w-full py-12 max-w-2xl">
      {/* Header with count and sorting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-lg sm:text-xl font-semibold">
          Found {projects.length}+ projects
        </h1>
      </div>

      <ProjectsList projects={projects} userId={userId ?? ""} />
    </div>
  );
}
