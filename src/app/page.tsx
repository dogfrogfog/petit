import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  return (
    <main className="min-h-screen text-foreground flex flex-col items-center justify-center text-center px-4">
      {/* Hero Text */}
      <h1 className="text-5xl sm:text-7xl font-serif max-w-4xl mb-12 font-italic">
        Connect - Collaborate - Create
      </h1>

      <p className=" text-xl max-w-2xl mb-24">
        Plump takes care of job searching, application and initial
        communication, so you can focus on things you love
      </p>

      <div className="flex gap-12 items-center justify-center">
        <Button asChild>
          <Link href="/profile">Начать</Link>
        </Button>
        <Button asChild variant={"secondary"}>
          <Link href="/jobs">Работа</Link>
        </Button>
      </div>
    </main>
  );
}
