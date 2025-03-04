import { ProjectCard } from "@/components/project-card";
import { ProjectVacancyCard } from "@/components/project-vacancy-card";
import { getProjectData } from "@/lib/actions/project-data";
import { getProjectVacanciesData } from "@/lib/actions/vacancies-data";
import { projectDomains } from "@/lib/constants";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const params = await props.params;

  const project = await getProjectData(parseInt(params.id));
  const oneProject = { ...project?.[0], domain: projectDomains[0] };

  if (!oneProject) {
    return <div>Project not found</div>;
  }

  const vacancies = await getProjectVacanciesData(oneProject.id);

  return (
    <div className="mx-auto mt-12 max-w-2xl space-y-8">
      <h2 className="text-2xl font-bold">Проект</h2>
      <ProjectCard project={oneProject} />
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Вакансии</h2>
        <div className="space-y-4">
          {vacancies.map((vacancy) => (
            <ProjectVacancyCard key={vacancy.id} vacancy={vacancy} projectId={oneProject.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
