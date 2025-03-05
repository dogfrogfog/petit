"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { HeaderLogin } from "@/components/header-login";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { NotepadText } from "lucide-react";
import { UsersRound } from "lucide-react";
import { User } from "lucide-react";
import { Rss } from "lucide-react";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getProjectsData } from "@/lib/actions/project-data";

interface Project {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  status: "open" | "closed";
  description: string;
  url: string | null;
  companyId: number;
}

export function Sidemenu() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjectsData();
        setProjects(projectsData);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    if (user) {
      fetchProjects();
    }
  }, [user]);

  const handleProfileClick = () => {
    router.push("/dashboard/profile");
  };

  const handleUpdatesClick = () => {
    window.open("https://t.me/petIT_colab", "_blank", "noopener,noreferrer");
  };

  const handleLogoutClick = () => {
    signOut();
  };

  return (
    <SidebarProvider>
      <Sidebar className="w-[15vw] h-screen border-r">
        <SignedIn>
          <SidebarContent>
            {/* Основное */}
            <SidebarGroup>
              <div className="text-lg font-bold px-4">Основное</div>
              <nav className="space-y-2 p-4">
                <div>
                  <Link
                    href="/projects"
                    className="flex items-center gap-2 w-full rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                  >
                    <LayoutGrid />
                    <span>Проекты</span>
                  </Link>
                </div>
                <div>
                  <Link
                    href="/vacancies"
                    className="flex items-center gap-2 w-full rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                  >
                    <NotepadText />
                    <span>Вакансии</span>
                  </Link>
                </div>
                <div>
                  <Link
                    href="/companies"
                    className="flex items-center gap-2 w-full rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                  >
                    <UsersRound />
                    <span>Участники</span>
                  </Link>
                </div>
              </nav>
            </SidebarGroup>

            {/* Мои проекты */}
            <SidebarGroup>
              <div className="text-lg font-bold px-4">Мои проекты</div>
              <SidebarMenu className="p-4">
                {projects.map((project) => (
                  <Collapsible
                    key={project.id}
                    defaultOpen
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="text-base flex items-center space-x-4 cursor-pointer hover:bg-accent w-full">
                          {project.name}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem className="text-sm flex items-center space-x-4 p-1 cursor-pointer hover:bg-accent w-full">
                            Описание
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem className="text-sm flex items-center space-x-4 p-1 cursor-pointer hover:bg-accent w-full">
                            Команда
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </SignedIn>

        <SidebarFooter className="p-4 space-y-4">
          {/* Пользователь */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Card className="flex items-center space-x-4 p-3 cursor-pointer hover:bg-accent w-full">
                <HeaderLogin />
                <CardContent className="p-0 flex flex-col justify-center">
                  <div className="text-sm font-medium">{user?.fullName}</div>
                  <div className="text-xs text-gray-500">
                    {user?.primaryEmailAddress?.emailAddress}
                  </div>
                </CardContent>
              </Card>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[calc(15vw-2rem)]"
              sideOffset={0}
            >
              <DropdownMenuItem
                className="flex items-center gap-2 w-full rounded-md p-2"
                onClick={handleProfileClick}
              >
                <User />
                <span>Профиль</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 w-full rounded-md p-2"
                onClick={handleUpdatesClick}
              >
                <Rss />
                <span>Обновления</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 w-full rounded-md p-2"
                onClick={handleLogoutClick}
              >
                <LogOut />
                <span>Выход</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Логотип */}
          <div className="text-center text-green-600 font-bold text-lg">
            <Link href="/">pet.it</Link>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
