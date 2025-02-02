import { getProjectData } from "@/lib/actions/project-data";
import {
  deleteVacancyData,
  getProjectVacanciesData,
} from "@/lib/actions/vacancies-data";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ProjectVacancyCard } from "@/components/project-vacancy-card";
import { getCompanyData } from "@/lib/actions/company-data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
  const params = await props.params;
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const project = await getProjectData(parseInt(params.id));
  const oneProject = project[0];
  const company = await getCompanyData(userId);
  const oneCompany = company[0];

  if (oneCompany.id !== oneProject.companyId) {
    redirect("/dashboard/projects");
  }

  const vacancies = await getProjectVacanciesData(oneProject.id);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold">{oneProject.name}</h1>
        <div className="flex items-center gap-4">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              oneProject.status === "open"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {oneProject.status === "open" ? "Открыт" : "Закрыт"}
          </span>
          <a
            href={`/dashboard/projects/${oneProject.id}/update`}
            className="text-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            Редактировать
          </a>
        </div>
      </div>

      <div className="rounded-lg border p-6">
        <p className="text-sm font-semibold">Описание проекта</p>
        <p className="text-muted-foreground">{oneProject.description}</p>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-foreground">Вакансии</h2>
            <a
              href={`/dashboard/projects/${oneProject.id}/vacancies/create`}
              className="text-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              Добавить вакансию
            </a>
          </div>

          <div className="space-y-4">
            {vacancies.map((vacancy) => (
              <div key={vacancy.id}>
                <ProjectVacancyCard
                  projectId={oneProject.id}
                  vacancy={vacancy}
                  deleteVacancyData={deleteVacancyData}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
