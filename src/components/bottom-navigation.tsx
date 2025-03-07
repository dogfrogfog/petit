"use client";

import { HeaderLogin } from "@/components/header-login";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarFooter } from "@/components/ui/sidebar";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";
import { useClickAway } from "@uidotdev/usehooks";
import { LogOut, Rss, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function BottomNavigation() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useClickAway<HTMLDivElement>(() => {
    setIsDropdownOpen(false);
  });

  const handleProfileClick = () => {
    router.push("/dashboard/profile");
    setIsDropdownOpen(false);
  };

  const handleUpdatesClick = () => {
    window.open("https://t.me/petIT_colab", "_blank", "noopener,noreferrer");
    setIsDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    signOut();
  };

  return (
    <SidebarFooter className="p-4 space-y-4">
      <SignedIn>
        {user && (
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Card className="flex items-center space-x-4 p-3 cursor-pointer hover:bg-accent w-full">
                <HeaderLogin />
                <CardContent className="p-0 flex flex-col justify-center min-w-0">
                  <div className="text-sm font-medium truncate">
                    {user?.fullName}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {user?.primaryEmailAddress?.emailAddress}
                  </div>
                </CardContent>
              </Card>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              ref={dropdownRef}
              align="start"
              className="w-[14rem]"
              sideOffset={0}
            >
              <DropdownMenuItem
                className="flex items-center gap-2 w-full rounded-md p-2"
                onClick={handleProfileClick}
              >
                <User className="flex-none" />
                <span>Профиль</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 w-full rounded-md p-2"
                onClick={handleUpdatesClick}
              >
                <Rss className="flex-none" />
                <span>Обновления</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 w-full rounded-md p-2"
                onClick={handleLogoutClick}
              >
                <LogOut className="flex-none" />
                <span>Выход</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SignedIn>

      <SignedOut>
        <div className="flex justify-center">
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
          >
            Войти
          </Link>
        </div>
      </SignedOut>

      <div className="text-center text-green-600 font-bold text-lg">
        <Link href="/">pet.it</Link>
      </div>
    </SidebarFooter>
  );
}
