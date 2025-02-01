import { CompanyForm } from "@/components/company-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { editCompanyData } from "@/lib/actions/company-data";
import { db } from "@/lib/db/drizzle";
import { companyData } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const data = await db
    .select()
    .from(companyData)
    .where(eq(companyData.id, userId));

  if (data.length === 0) {
    redirect("/profile/company/create");
  }

  const userDataFromData = data[0];

  const finalDefaultData = {
    ...userDataFromData,
    domains: userDataFromData.domains.split(","),
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <CompanyForm submit={editCompanyData} defaultValues={finalDefaultData} />
    </div>
  );
}
