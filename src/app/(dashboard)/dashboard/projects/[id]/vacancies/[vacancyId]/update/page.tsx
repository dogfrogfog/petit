import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { vacancyData } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { editVacancyData } from "@/lib/actions/vacancies-data";
import { VacancyForm } from "@/components/vacancy-form";
import { getCompanyData } from "@/lib/actions/company-data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
  const params = (await props).params;
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const vacancy = await db
    .select()
    .from(vacancyData)
    .where(eq(vacancyData.id, parseInt(params.vacancyId)));

  const oneVacancy = vacancy[0];

  if (!oneVacancy) {
    redirect(`/dashboard/projects/${params.id}`);
  }

  const company = await getCompanyData(userId);
  const oneCompany = company[0];

  if (oneCompany.id !== oneVacancy.companyId) {
    redirect("/dashboard/projects");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit vacancy</h1>
      <VacancyForm
        defaultValues={oneVacancy}
        submit={editVacancyData}
        id={parseInt(params.vacancyId)}
        projectId={parseInt(params.id)}
        companyId={oneVacancy.companyId}
      />
    </div>
  );
}
