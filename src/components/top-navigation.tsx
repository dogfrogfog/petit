"use client";

import { SidebarGroup } from "@/components/ui/sidebar";
import { LayoutGrid, NotepadText, UsersRound } from "lucide-react";
import Link from "next/link";

export function TopNavigation() {
  return (
    <SidebarGroup>
      <div className="text-lg font-bold px-4 truncate">Основное</div>
      <nav className="space-y-2 p-4">
        <div>
          <Link
            href="/projects"
            className="flex items-center gap-2 w-full rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
          >
            <LayoutGrid className="flex-none" />
            <span className="truncate">Проекты</span>
          </Link>
        </div>
        <div>
          <Link
            href="/vacancies"
            className="flex items-center gap-2 w-full rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
          >
            <NotepadText className="flex-none" />
            <span className="truncate">Вакансии</span>
          </Link>
        </div>
        <div>
          <Link
            href="/companies"
            className="flex items-center gap-2 w-full rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
          >
            <UsersRound className="flex-none" />
            <span className="truncate">Участники</span>
          </Link>
        </div>
      </nav>
    </SidebarGroup>
  );
}
