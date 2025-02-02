import { HeroChangingMockProjects } from "@/components/hero-changing-mock-projects";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  return (
    <main className="pt-24 text-foreground flex flex-col items-center justify-center text-center px-4">
      {/* Hero Text */}
      <h1 className="text-5xl sm:text-7xl font-serif max-w-4xl mb-6 lg:mb-12 font-italic">
        Что это такое <span className="text-green-600">Pet.it</span>?
      </h1>

      <p className=" text-xl max-w-2xl mb-6 lg:mb-24">
        платформа для формирования команд и реализации ИТ проектов
      </p>

      <div className="flex gap-12 items-center justify-center mb-12">
        <Button asChild>
          <Link href="/dashboard/profile">Начать</Link>
        </Button>
        <Button asChild variant={"secondary"}>
          <Link href="/projects">Проекты</Link>
        </Button>
      </div>
      <HeroChangingMockProjects />
    </main>
  );
}
