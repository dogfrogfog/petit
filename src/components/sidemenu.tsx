"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { getProjectsData } from "@/lib/actions/project-data";
import { SignedIn, useUser } from "@clerk/nextjs";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { BottomNavigation } from "./bottom-navigation";
import { TopNavigation } from "./top-navigation";

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
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isClient, setIsClient] = useState(false);

  useLockBodyScroll();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (user) {
      const fetchProjects = async () => {
        try {
          const projectsData = await getProjectsData();
          setProjects(projectsData);
        } catch (error) {
          console.error("Failed to fetch projects:", error);
        }
      };
      fetchProjects();
    }
  }, [user]);

  if (!isClient) return null;

  return (
    <SidebarProvider>
      <Sidebar className="w-60 h-screen border-r fixed">
        <SidebarContent>
          <TopNavigation />

          <SignedIn>
            <SidebarGroup>
              <div className="text-lg font-bold px-4 truncate">Мои проекты</div>
              <SidebarMenu className="p-4">
                {projects.map((project) => (
                  <Collapsible
                    key={project.id}
                    defaultOpen
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="text-base flex items-center space-x-4 cursor-pointer hover:bg-accent w-full truncate">
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
          </SignedIn>
        </SidebarContent>

        <BottomNavigation />
      </Sidebar>
    </SidebarProvider>
  );
}
