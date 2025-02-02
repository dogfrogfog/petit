import { getVacancies } from "@/lib/actions/vacancies-data";
import { ProjectVacancyCard } from "@/components/project-vacancy-card";
import Link from "next/link";

export default async function Page() {
  const vacancies = await getVacancies();

  return (
    <div className="space-y-4 flex-1 px-4 md:px-6 max-w-7xl mx-auto w-full">
      {/* Header with count and sorting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-lg sm:text-xl font-semibold">
          Found {vacancies.length}+ vacancies
        </h1>
        <select className="w-full sm:w-auto p-2 border rounded-md">
          <option>Sort by relevance</option>
          <option>Sort by date</option>
          <option>Sort by salary</option>
        </select>
      </div>

      <div className="space-y-4">
        {vacancies.map((v) => (
          <Link href={`/vacancies/${v.id}`} key={v.id} className="block">
            <ProjectVacancyCard projectId={v.projectId} vacancy={v} />
          </Link>
        ))}
      </div>
    </div>
  );
}
