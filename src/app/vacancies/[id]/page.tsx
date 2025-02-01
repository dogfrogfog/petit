import { ProjectVacancyCard } from "@/components/project-vacancy-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjectData } from "@/lib/actions/project-data";
import { getVacancy } from "@/lib/actions/vacancies-data";
import { FlagIcon } from "lucide-react";

export default async function Page(props: Promise<{ params: { id: string } }>) {
  const params = (await props).params;

  const vacancy = await getVacancy(params.id);
  const oneVacancy = vacancy[0];
  const project = await getProjectData(oneVacancy.projectId);
  const oneProject = project[0];

  console.log(vacancy, oneProject);

  return (
    <div className="space-y-4">
      <ProjectVacancyCard vacancy={oneVacancy} projectId={oneProject.id} />
      <Card className="dark">
        <CardHeader>
          <CardTitle>{oneProject.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{oneProject.description}</p>
        </CardContent>
      </Card>
      <Card className="dark pt-6">
        <CardContent className="flex justify-between items-center">
          <Button variant="destructive" asChild>
            <a href={`mailto:report.retired451@passmail.net`}>
              <div className="flex items-center gap-1">
                <FlagIcon className="size-4" />
                Пожаловаться
              </div>
            </a>
          </Button>

          <Button>Откликнуться</Button>
        </CardContent>
      </Card>
    </div>
  );
}
