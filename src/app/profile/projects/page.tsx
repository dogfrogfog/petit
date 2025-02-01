import { getCompanyProjectsData } from "@/lib/actions/project-data";
import { getCompanyData } from "@/lib/actions/company-data";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
export default async function Page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const company = await getCompanyData(userId);

  if (company.length === 0) {
    redirect("/profile/company/create");
  }

  const oneCommpany = company[0];

  const projects = await getCompanyProjectsData(oneCommpany.id);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Company{"'"}s project</h1>
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <Link href={`/profile/projects/${project.id}`} key={project.id}>
            <div key={project.id} className="p-4 border rounded-lg shadow">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{project.name}</h3>
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    project.status === "open"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
