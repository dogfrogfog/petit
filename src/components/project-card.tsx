"use client";

import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "./ui/card";
import { ProjectData } from "@/lib/actions/project-data";
import { Badge } from "./ui/badge";

export function ProjectCard({
  project,
}: {
  /** @todo: разобраться в бд с tags,currentParticipants,maxParticipants */
  project: ProjectData & { tags: string[]; currentParticipants: number; maxParticipants: number };
}) {
  return (
    <Card className="flex items-center gap-4 px-3">
      <Image
        className="shrink-0 rounded-full"
        src={project.logo || "/project-logo.png"}
        alt=""
        width={68}
        height={68}
      />
      <div className="flex flex-col gap-2">
        <CardHeader className="text-start">
          <CardTitle>{project.name}</CardTitle>
          {project.url && <CardDescription className="truncate">{project.url}</CardDescription>}
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p className="line-clamp-2 text-start text-xs font-normal text-zinc-500">{project.description}</p>
          <div className="flex gap-2">
            <Badge>{project.domain}</Badge>
          </div>
        </CardContent>
      </div>
      <div className="flex shrink-0 flex-col gap-1.5">
        <Image src="/users.png" alt="Member count for the project" width={24} height={24} />
        <span className="text-xs">{0 / 0}</span>
      </div>
    </Card>
  );
}
