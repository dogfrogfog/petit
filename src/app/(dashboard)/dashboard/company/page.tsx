import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCompanyData } from "@/lib/actions/company-data";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const companyData = await getCompanyData(userId);

  const oneCompany = companyData[0];

  return (
    <Card className="p-8">
      {oneCompany ? (
        <>
          <div className="flex justify-end">
            <Button variant={"secondary"} asChild>
              <Link href="/dashboard/company/update">Обновить компанию</Link>
            </Button>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Основная информация
              </h3>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Название</p>
                  <p className="mt-1 font-medium">{oneCompany.name}</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Размер</p>
                  <p className="mt-1 font-medium">{oneCompany.size}</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">
                    Местоположение
                  </p>
                  <p className="mt-1 font-medium">{oneCompany.location}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">Ссылка</h3>
              <a
                href={oneCompany.url}
                className="mt-4 text-primary hover:text-primary/90 block"
              >
                {oneCompany.url}
              </a>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Области проектов
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {oneCompany.domains.split(",").map((domain) => (
                  <span
                    key={domain}
                    className="rounded-full bg-secondary text-secondary-foreground px-4 py-1 text-sm font-medium"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">Даты</h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Создано</p>
                  <p className="mt-1 font-medium">
                    {new Date(oneCompany.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Обновлено</p>
                  <p className="mt-1 font-medium">
                    {new Date(oneCompany.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Button asChild>
          <Link href="/dashboard/company/create">Добавить данные компании</Link>
        </Button>
      )}
    </Card>
  );
}
