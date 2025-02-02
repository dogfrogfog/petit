"use client";

import { ProjectCard } from "@/components/project-card";
import { useRouter } from "next/navigation";

export function ProjectsList({
  projects,
  userId,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  projects: any[];
  userId: string;
}) {
  const router = useRouter();

  function handleClick(
    projectId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();

    if (!userId) {
      router.push("/sign-in");
    } else {
      router.push(`/projects/${projectId}`);
    }
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <button
          onClick={(e) => handleClick(project.id, e)}
          key={project.id}
          className="block"
        >
          <ProjectCard project={project} />
        </button>
      ))}
    </div>
  );
}
