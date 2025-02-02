"use client";

import { useState, useEffect } from "react";
import { ProjectCard } from "./project-card";

export function HeroChangingMockProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const mockProjects = [
    {
      id: 1,
      name: "Frontend Developer",
      status: "open",
      description: "Ищем опытного фронтенд-разработчика в нашу команду",
      location: "Берлин",
      projectRoles: "Frontend Developer",
      projectDomains: "Web Development",
      expertiseLevel: "Middle",
    },
    {
      id: 2,
      name: "Backend Engineer",
      status: "open",
      description: "Требуется backend-разработчик со знанием Node.js",
      location: "Амстердам",
      projectRoles: "Backend Developer",
      projectDomains: "Server Development",
      expertiseLevel: "Senior",
    },
    {
      id: 3,
      name: "UI/UX Designer",
      status: "open",
      description: "Ищем креативного UI/UX дизайнера",
      location: "Париж",
      projectRoles: "Designer",
      projectDomains: "Design,UI/UX",
      expertiseLevel: "Middle",
    },
    {
      id: 4,
      name: "DevOps Engineer",
      status: "open",
      description: "Ищем DevOps инженера с опытом работы в облаке",
      location: "Стокгольм",
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
