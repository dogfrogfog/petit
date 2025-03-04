import { ProjectsList } from "@/components/projects-list";
import { getProjectsData } from "@/lib/actions/project-data";
import { projectDomains } from "@/lib/constants";
import { auth } from "@clerk/nextjs/server";

export default async function Projects() {
  const { userId } = await auth();
  const projects = await getProjectsData();
  const projectsWithMockedDomain = projects.map((item) => ({ ...item, domain: projectDomains[0] }));

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 space-y-4 px-4 py-12 md:px-6">
      {/* Header with count and sorting */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-lg font-semibold sm:text-xl">Found {projects.length}+ projects</h1>
      </div>

      <ProjectsList projects={projectsWithMockedDomain} userId={userId ?? ""} />
    </div>
  );
}
