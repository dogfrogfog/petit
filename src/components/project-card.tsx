"use client";

import { Card, CardHeader, CardContent } from "./ui/card";
// import { Badge } from "./ui/badge";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-wrap flex-row justify-between gap-2 space-y-0">
        <div className="gap-2 items-center flex">
          <p className="font-semibold text-md">{project.name}</p>
        </div>
        {/* <Badge
          variant={project.status === "open" ? "success" : "destructive"}
          className="capitalize"
        >
          {project.status}
        </Badge> */}
      </CardHeader>
      <CardContent className="space-y-4 text-left">
        {project.url && (
          <div className="space-y-0">
            <p className="text-sm">Ссылка на проект</p>
            <p className="text-sm text-muted-foreground">
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                {project.url}
              </a>
            </p>
          </div>
        )}

        <div className="space-y-0">
          <p className="text-sm">Описание</p>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
