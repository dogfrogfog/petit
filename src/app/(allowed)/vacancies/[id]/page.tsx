import { ProjectVacancyCard } from "@/components/project-vacancy-card";
import { ApplyCard } from "@/components/apply-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjectData } from "@/lib/actions/project-data";
import { getVacancy } from "@/lib/actions/vacancies-data";
import { getUserData } from "@/lib/actions/user-data";
import { addApplicationData } from "@/lib/actions/application-data";
import { auth } from "@clerk/nextjs/server";

export default async function Page(props: Promise<{ params: { id: string } }>) {
  const { userId } = await auth();

  const params = (await props).params;

  const vacancy = await getVacancy(params.id);
  const oneVacancy = vacancy[0];
  const project = await getProjectData(oneVacancy.projectId);
  const oneProject = project[0];

  const userData = userId ? await getUserData(userId) : null;
  const oneUserData = userData ? userData[0] : null;

  return (
    <div className="space-y-4">
      <ProjectVacancyCard vacancy={oneVacancy} projectId={oneProject.id} />
      <Card className="dark">
        <CardHeader>
          <CardTitle>Проект</CardTitle>
        </CardHeader>
        <CardContent>
          <CardTitle>{oneProject.name}</CardTitle>
          <p>{oneProject.description}</p>
        </CardContent>
      </Card>
      <ApplyCard
        addApplicationData={addApplicationData}
        vacancy={oneVacancy}
        userData={oneUserData}
      />
    </div>
  );
}
