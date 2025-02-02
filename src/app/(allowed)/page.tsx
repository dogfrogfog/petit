import { HeroChangingMockProjects } from "@/components/hero-changing-mock-projects";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TextEffectPerLine } from "@/components/text-with-effects";
export default async function Page() {
  return (
    <main className="text-foreground flex flex-col items-center justify-center text-center px-4 h-[calc(100vh-96px)]">
      {/* Hero Text */}
      <div className="space-y-10">
        <h1 className="text-4xl font-serif max-w-4xl font-italic">
          <TextEffectPerLine
            multilineText={`
            Собери команду.
            Реализуй проект.
            Стань лучше.`}
          />
        </h1>

        <p className="text-xl max-w-2xl mx-auto">
          Что это такое <span className="text-green-600">Pet.it</span>? -
          платформа для фарміравання каманд і рэалізацыі ІТ праектаў
        </p>

        <div className="flex gap-12 items-center justify-center">
          <Button asChild>
            <Link href="/dashboard/profile">Начать</Link>
          </Button>
          <Button asChild variant={"secondary"}>
            <Link href="/projects">Проекты</Link>
          </Button>
        </div>
        <HeroChangingMockProjects />
      </div>
    </main>
  );
}
