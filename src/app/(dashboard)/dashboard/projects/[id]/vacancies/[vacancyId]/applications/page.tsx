import { getProjectApplicationsData } from "@/lib/actions/application-data";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUserData } from "@/lib/actions/user-data";

export default async function Page(props: Promise<{ params: { id: string } }>) {
  const params = (await props).params;
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const userData = await getUserData(userId);

  const applications = await getProjectApplicationsData(params.id);

  const oneUserData = userData[0];

  if (oneUserData.companyId !== applications[0].companyId) {
    redirect("/dashboard/projects");
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Отклики на вакансию</h1>
        {applications.length === 0 ? (
          <p className="text-muted-foreground">Откликов нет</p>
        ) : (
          <div className="space-y-4">
            {applications.map(async (application) => {
              const applicant = await getUserData(application.userId);
              const oneApplicant = applicant[0];

              return (
                <div
                  key={application.id}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{oneApplicant.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Applied on{" "}
                        {new Date(application.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          application.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : application.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {application.status.charAt(0).toUpperCase() +
                          application.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
