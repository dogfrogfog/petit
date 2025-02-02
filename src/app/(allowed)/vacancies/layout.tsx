import { VacancyFilters } from "@/components/vacancy-filters";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container py-40">
      <div className="flex gap-6">
        <div className="w-80 flex-shrink-0">
          <VacancyFilters />
        </div>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
