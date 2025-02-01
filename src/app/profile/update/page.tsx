import { ProfileForm } from "@/components/profile-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { editUserData } from "@/lib/actions/user-data";
import { db } from "@/lib/db/drizzle";
import { userData } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const data = await db
    .select()
    .from(userData)
    .where(eq(userData.userId, userId));

  if (data.length === 0) {
    redirect("/profile/create");
  }

  const userDataFromData = data[0];

  const finalDefaultData = {
    ...userDataFromData,
    projectRoles: userDataFromData.projectRoles.split(","),
    projectDomains: userDataFromData.projectDomains.split(","),
    spokenLanguages: userDataFromData.spokenLanguages.split(","),
    programmingLanguages: userDataFromData.programmingLanguages.split(","),
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <ProfileForm submit={editUserData} defaultValues={finalDefaultData} />
    </div>
  );
}
