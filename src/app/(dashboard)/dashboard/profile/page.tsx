import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getUserData } from "@/lib/actions/user-data";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Component() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const userData = await getUserData(userId);

  const oneUser = userData[0];

  return (
    <Card className="p-8">
      {oneUser ? (
        <>
          <div className="flex justify-end">
            <Button variant={"secondary"} asChild>
              <Link href="/dashboard/profile/update">Обновить профиль</Link>
            </Button>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Основная информация
              </h3>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Имя</p>
                  <p className="mt-1 font-medium">{oneUser.name}</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Фамилия</p>
                  <p className="mt-1 font-medium">{oneUser.lastName}</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">
                    Имя пользователя
                  </p>
                  <p className="mt-1 font-medium">{oneUser.userName}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Описание
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {oneUser.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">Ссылка</h3>
              <a
                href={oneUser.url}
                className="mt-4 text-primary hover:text-primary/90 block"
              >
                {oneUser.url}
              </a>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Роли в проектах
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {oneUser.projectRoles.split(",").map((role) => (
                  <span
                    key={role}
                    className="rounded-full bg-secondary text-secondary-foreground px-4 py-1 text-sm font-medium"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Области проектов
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {oneUser.projectDomains.split(",").map((domain) => (
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
              <h3 className="text-lg font-semibold text-foreground">
                Уровень экспертизы
              </h3>
              <p className="mt-4 text-muted-foreground">
                {oneUser.expertiseLevel}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Языки общения
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {oneUser.spokenLanguages.split(",").map((language) => (
                  <span
                    key={language}
                    className="rounded-full bg-secondary text-secondary-foreground px-4 py-1 text-sm font-medium"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Языки программирования
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {oneUser.programmingLanguages.split(",").map((language) => (
                  <span
                    key={language}
                    className="rounded-full bg-secondary text-secondary-foreground px-4 py-1 text-sm font-medium"
                  >
                    {language}
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
                    {new Date(oneUser.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Обновлено</p>
                  <p className="mt-1 font-medium">
                    {new Date(oneUser.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Button asChild>
          <Link href="/dashboard/profile/create">Добавить данные профиля</Link>
        </Button>
      )}
    </Card>
  );
}
