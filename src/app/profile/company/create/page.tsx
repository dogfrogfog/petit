import { CompanyForm } from "@/components/company-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { addCompanyData } from "@/lib/actions/company-data";
import { eq } from "drizzle-orm";
import { companyData } from "@/lib/db/schema";
import { db } from "@/lib/db/drizzle";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const data = await db
    .select()
    .from(companyData)
    .where(eq(companyData.id, userId));

  if (data.length > 0) {
    redirect("/profile/company/update");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <CompanyForm submit={addCompanyData} />
    </div>
  );
}
