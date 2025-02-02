import { ProfileForm } from "@/components/profile-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { addUserData } from "@/lib/actions/user-data";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { userData } from "@/lib/db/schema";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const data = await db
    .select()
    .from(userData)
    .where(eq(userData.userId, userId));

  if (data.length > 0) {
    redirect("/dashboard/profile/update");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Добавить данные профиля</h1>
      <ProfileForm submit={addUserData} />
    </div>
  );
}
