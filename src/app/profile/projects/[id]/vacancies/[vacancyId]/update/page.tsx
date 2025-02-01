import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { vacancyData } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { editVacancyData } from "@/lib/actions/vacancies-data";
import { VacancyForm } from "@/components/vacancy-form";

export default async function Page(
  props: Promise<{ params: { id: string; vacancyId: string } }>
) {
  const params = await props.params;
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const vacancy = await db
    .select()
    .from(vacancyData)
    .where(eq(vacancyData.id, params.vacancyId));

  const oneVacancy = vacancy[0];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit vacancy</h1>
      <VacancyForm
        defaultValues={oneVacancy}
        submit={editVacancyData}
        id={params.vacancyId}
        projectId={params.id}
        companyId={oneVacancy.companyId}
      />
    </div>
  );
}
