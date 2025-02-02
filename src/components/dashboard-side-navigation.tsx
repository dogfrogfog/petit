// import { BriefcaseIcon } from "lucide-react";
import { BriefcaseIcon, FolderIcon } from "lucide-react";
import { UserIcon } from "lucide-react";
import { BuildingIcon } from "lucide-react";
import Link from "next/link";

export function DashboardSideNavigation() {
  return (
    <div className="">
      <div className="flex flex-col gap-2 bg-background rounded-xl">
        <div className="p-4">
          <nav className="flex flex-col gap-2">
            <Link
              href="/dashboard/profile"
              className="text-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              <UserIcon className="h-4 w-4" />
              <span>Личный профиль</span>
            </Link>
            <Link
              href="/dashboard/company"
              className="text-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              <BuildingIcon className="h-4 w-4" />
              <span>Профиль компании</span>
            </Link>
            <Link
              href="/dashboard/projects"
              className="text-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              <FolderIcon className="h-4 w-4" />
              <span>Проекты</span>
            </Link>
            <Link
              href="/dashboard/applications"
              className="text-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              <BriefcaseIcon className="h-4 w-4" />
              <span>Ваши заявки</span>
            </Link>
            {/* <Link
              href="/dashboard/vacancies"
              className="text-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              <BriefcaseIcon className="h-4 w-4" />
              <span>Вакансии</span>
            </Link> */}
          </nav>
        </div>
      </div>
    </div>
  );
}
