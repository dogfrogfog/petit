import { getProjectData } from "@/lib/actions/project-data";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page(props: Promise<{ params: { id: string } }>) {
  const params = await props.params;
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const project = await getProjectData(params.id);

  const oneProject = project[0];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="p-4 border rounded-lg shadow">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">{oneProject.name}</h1>
          <div className="flex items-center gap-4">
            <span
              className={`px-2 py-1 text-sm rounded-full ${
                oneProject.status === "open"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {oneProject.status}
            </span>
            <a
              href={`/profile/projects/${oneProject.id}/update`}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Edit
            </a>
          </div>
        </div>
        <p className="mt-4 text-gray-600">{oneProject.description}</p>
      </div>
    </div>
  );
}
