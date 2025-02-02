import { ProjectForm } from "@/components/project-form";
import { editProjectData, getProjectData } from "@/lib/actions/project-data";
import { getCompanyData } from "@/lib/actions/company-data";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
  const params = await props.params;
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const company = await getCompanyData(userId);

  if (company.length === 0) {
    redirect("/dashboard/company/create");
  }

  const project = await getProjectData(params.id);
  const oneCommpany = company[0];
  const oneProject = project[0];

  if (oneCommpany.id !== oneProject.companyId) {
    redirect("/dashboard/projects");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Обновить проект</h1>
      <ProjectForm
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        defaultValues={oneProject as any}
        submit={editProjectData}
        id={params.id}
        companyId={oneCommpany.id}
      />
    </div>
  );
}
