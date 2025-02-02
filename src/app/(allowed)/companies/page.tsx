import { getCompaniesData } from "@/lib/actions/company-data";

export default async function Page() {
  const companies = await getCompaniesData();

  return (
    <div className="space-y-4 flex-1 px-4 md:px-6 mx-auto w-full py-40 max-w-2xl">
      <h1 className="text-lg sm:text-xl font-semibold">Компании</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => (
          <div
            key={company.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-medium text-lg">{company.name}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {company.domains.split(",").map((domain, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {domain.trim()}
                </span>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>Размер компании: {company.size}</p>
              <p>Местоположение: {company.location}</p>
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Веб-сайт компании
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
