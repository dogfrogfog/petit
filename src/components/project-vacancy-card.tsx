"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  // DollarSign,
  MapPin,
} from "lucide-react";

export function ProjectVacancyCard({
  projectId,
  vacancy,
  deleteVacancyData,
}: {
  projectId: number;
  vacancy: {
    id: number;
    name: string;
    status: string;
    description?: string;
    salary?: string;
    location?: string;
    requirements?: string;
    projectRoles?: string;
    projectDomains?: string;
    expertiseLevel?: string;
  };
  deleteVacancyData?: (id: number) => void;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 space-y-0">
        <div className="flex items-center gap-2">
          <p className="text-md font-semibold">{vacancy.name}</p>
          {/* <p className="text-sm text-muted-foreground">{project.name}</p> */}
        </div>
        <Badge className="capitalize">{vacancy.status}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {vacancy.projectDomains?.split(",").map((domain) => (
            <Badge key={domain}>
              <p className="text-sm text-muted-foreground">{domain}</p>
            </Badge>
          ))}

          {vacancy.projectRoles?.split(",").map((role) => (
            <Badge key={role}>
              <p className="text-sm text-muted-foreground">{role}</p>
            </Badge>
          ))}

          <Badge>
            <p className="text-sm text-muted-foreground">{vacancy.expertiseLevel}</p>
          </Badge>
          {/* <div className="flex items-center gap-1">
            <DollarSign className="size-4" />
            {vacancy.salary}
          </div> */}
          <div className="flex items-center gap-1">
            <MapPin className="size-4" />
            {vacancy.location}
          </div>
        </div>
        {vacancy.description && (
          <div className="space-y-0">
            <p className="text-sm">Описание</p>
            <p className="text-sm text-muted-foreground">{vacancy.description}</p>
          </div>
        )}

        {vacancy.requirements && (
          <div className="space-y-0">
            <p className="text-sm">Требования</p>
            <p className="text-sm text-muted-foreground">{vacancy.requirements}</p>
          </div>
        )}
      </CardContent>
      {deleteVacancyData && (
        <CardFooter className="flex flex-wrap justify-end gap-2">
          <Button className="bg-yellow-500" asChild>
            <Link href={`/dashboard/projects/${projectId}/vacancies/${vacancy.id}/applications`}>
              Отклики на вакансию
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/projects/${projectId}/vacancies/${vacancy.id}/update`}>Изменить</Link>
          </Button>
          <Button variant="destructive" onClick={() => deleteVacancyData(vacancy.id)}>
            Удалить
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
