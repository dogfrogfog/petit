import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { projectData } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { addVacancyData } from "@/lib/actions/vacancies-data";
import { VacancyForm } from "@/components/vacancy-form";

export default async function Page(props: Promise<{ params: { id: string } }>) {
  const params = await props.params;
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const project = await db
    .select({
      id: projectData.id,
      companyId: projectData.companyId,
    })
    .from(projectData)
    .where(eq(projectData.id, params.id));

  const oneProject = project[0];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create vacancy</h1>
      <VacancyForm
        submit={addVacancyData}
        id={-1}
        projectId={oneProject.id}
        companyId={oneProject.companyId}
      />
    </div>
  );
}
