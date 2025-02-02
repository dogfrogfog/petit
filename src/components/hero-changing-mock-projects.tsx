"use client";

import { useState, useEffect } from "react";
import { ProjectCard } from "./project-card";

export function HeroChangingMockProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const mockProjects = [
    {
      id: 1,
      name: "Забота о старшем поколении",
      status: "open",
      description:
        "Разработка приложения для координации волонтёров, помогающих пожилым людям с доставкой продуктов и лекарств",
      location: "Германия",
      projectRoles: "Frontend Developer",
      projectDomains: "Web Development",
      expertiseLevel: "Middle",
    },
    {
      id: 2,
      name: "ЭкоБрест",
      status: "open",
      description:
        "Создание платформы для организации раздельного сбора мусора и координации экологических инициатив в городе",
      location: "Беларусь",
      projectRoles: "Backend Developer",
      projectDomains: "Server Development",
      expertiseLevel: "Senior",
    },
    {
      id: 3,
      name: "Учись играя",
      status: "open",
      description:
        "Разработка образовательной платформы с игровыми элементами для детей из малообеспеченных семей",
      location: "Польша, Варшава",
      projectRoles: "Designer",
      projectDomains: "Design,UI/UX",
      expertiseLevel: "Middle",
    },
    {
      id: 4,
      name: "ДоброСосед",
      status: "open",
      description:
        "Создание приложения для объединения соседей и организации взаимопомощи в многоквартирных домах",
      location: "Беларусь",
      projectRoles: "DevOps",
      projectDomains: "Infrastructure,Cloud",
      expertiseLevel: "Senior",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === mockProjects.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="lg:w-[600px] mx-auto">
      <div className="transition-opacity duration-500 ease-in-out">
        <ProjectCard project={mockProjects[currentIndex]} />
      </div>
    </div>
  );
}
