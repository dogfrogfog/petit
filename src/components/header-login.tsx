"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import {
  BuildingIcon,
  UserIcon,
  BriefcaseIcon,
  FolderIcon,
} from "lucide-react";

export function HeaderLogin() {
  return (
    <div className="flex items-center justify-end">
      <SignedIn>
        <div className="flex items-center">
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Личный профиль"
                labelIcon={<UserIcon className="h-4 w-4" />}
                onClick={() => (window.location.href = "/dashboard/profile")}
              />
              <UserButton.Action
                label="Профиль компании"
                labelIcon={<BuildingIcon className="h-4 w-4" />}
                onClick={() => (window.location.href = "/dashboard/company")}
              />
              <UserButton.Action
                label="Проекты"
                labelIcon={<FolderIcon className="h-4 w-4" />}
                onClick={() => (window.location.href = "/dashboard/projects")}
              />
              <UserButton.Action
                label="Ваши заявки"
                labelIcon={<BriefcaseIcon className="h-4 w-4" />}
                onClick={() =>
                  (window.location.href = "/dashboard/applications")
                }
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <Button variant={"secondary"}>Войти</Button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
