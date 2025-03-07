"use client";

import { useState, useEffect } from "react";
import { ProjectCard } from "./project-card";
import { projectDomains } from "@/lib/constants";

export function HeroChangingMockProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const mockProjects = [
    {
      id: 1,
      name: "Забота о старшем поколении",
      status: "open",
      description:
        "Разработка приложения для координации волонтёров, помогающих пожилым людям с доставкой продуктов и лекарств",
      url: "www.figma.com/",
      domain: projectDomains[0],
    },
    {
      id: 2,
      name: "ЭкоБрест",
      status: "open",
      description:
        "Создание платформы для организации раздельного сбора мусора и координации экологических инициатив в городе",
      url: "www.figma.com/",
      domain: projectDomains[1],
    },
    {
      id: 3,
      name: "Учись играя",
      status: "open",
      description: "Разработка образовательной платформы с игровыми элементами для детей из малообеспеченных семей",
      url: "www.figma.com/",
      domain: projectDomains[2],
    },
    {
      id: 4,
      name: "ДоброСосед",
      status: "open",
      description: "Создание приложения для объединения соседей и организации взаимопомощи в многоквартирных домах",
      url: "www.figma.com/",
      domain: projectDomains[3],
    },
  ] as const;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === mockProjects.length - 1 ? 0 : prevIndex + 1));
    }, 2000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto lg:w-[600px]">
      <div className="transition-opacity duration-500 ease-in-out">
        <ProjectCard project={mockProjects[currentIndex]} />
      </div>
    </div>
  );
}
