import { ProjectForm } from "@/components/project-form";
import { addProjectData } from "@/lib/actions/project-data";
import { getCompanyData } from "@/lib/actions/company-data";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const company = await getCompanyData(userId);

  if (company.length === 0) {
    redirect("/profile/company/create");
  }

  const oneCommpany = company[0];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create project</h1>
      <ProjectForm submit={addProjectData} id={-1} companyId={oneCommpany.id} />
    </div>
  );
}
