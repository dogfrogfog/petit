"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projectDomains, expertiseLevels, projectRoles } from "@/lib/constants";
import { MultiselectCombobox } from "@/components/ui/multiselect-combobox";
import { Input } from "./ui/input";
import { useState } from "react";

export function VacancyFilters() {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedProjectRoles, setSelectedProjectRoles] = useState<string[]>(
    []
  );
  const [selectedProjectDomains, setSelectedProjectDomains] = useState<
    string[]
  >([]);
  const [selectedExpertiseLevels, setSelectedExpertiseLevels] = useState<
    string[]
  >([]);
  // const [selectedSalary, setSelectedSalary] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const handleStatusChange = (value: string[]) => {
    setSelectedStatus(value);
  };

  const handleProjectRolesChange = (value: string[]) => {
    setSelectedProjectRoles(value);
  };

  const handleProjectDomainsChange = (value: string[]) => {
    setSelectedProjectDomains(value);
  };

  const handleExpertiseLevelsChange = (value: string[]) => {
    setSelectedExpertiseLevels(value);
  };

  // const handleSalaryChange = (value: string) => {
  //   setSelectedSalary(value);
  // };

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Настройки поиска</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Статус</label>
            <MultiselectCombobox
              value={selectedStatus}
              onChange={handleStatusChange}
              options={["открыта", "закрыта"].map((v) => ({
                value: v,
                label: v,
              }))}
            />
          </div>

          {/* <div>
            <label className="text-sm font-medium">Зарплата</label>
            <Input
              placeholder="Введите зарплату"
              value={selectedSalary}
              onChange={(e) => handleSalaryChange(e.target.value)}
            />
          </div> */}

          <div>
            <label className="text-sm font-medium">Местоположение</label>
            <Input
              placeholder="Введите местоположение"
              value={selectedLocation}
              onChange={(e) => handleLocationChange(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Роль в проекте</label>
            <MultiselectCombobox
              options={projectRoles.map((role) => ({
                value: role,
                label: role,
              }))}
              value={selectedProjectRoles}
              onChange={handleProjectRolesChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Домен</label>
            <MultiselectCombobox
              value={selectedProjectDomains}
              onChange={handleProjectDomainsChange}
              options={projectDomains.map((domain) => ({
                value: domain,
                label: domain,
              }))}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Уровень экспертизы</label>
            <MultiselectCombobox
              value={selectedExpertiseLevels}
              onChange={handleExpertiseLevelsChange}
              options={expertiseLevels.map((level) => ({
                value: level,
                label: level,
              }))}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
