import { getUserApplicationsData } from "@/lib/actions/application-data";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function Component() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const applications = await getUserApplicationsData(userId);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Ваши заявки</h1>
      {applications.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">
            Вы еще не подали ни одной заявки.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="rounded-lg border p-6 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Заявка #{application.id}</p>
                  <p className="text-sm text-muted-foreground">
                    Подана{" "}
                    {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className={`
                  px-3 py-1 rounded-full text-sm
                  ${
                    application.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : application.status === "accepted"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                `}
                >
                  {application.status === "pending"
                    ? "На рассмотрении"
                    : application.status === "accepted"
                    ? "Принята"
                    : "Отклонена"}
                </div>
              </div>
              {application.updatedAt !== application.createdAt && (
                <p className="text-sm text-muted-foreground mt-2">
                  Последнее обновление:{" "}
                  {new Date(application.updatedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
