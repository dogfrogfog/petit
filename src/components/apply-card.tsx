/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlagIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ApplyCard({
  vacancy,
  userData,
  addApplicationData,
}: {
  vacancy: any;
  userData: any;
  addApplicationData: any;
}) {
  const router = useRouter();

  async function handleApply() {
    try {
      await addApplicationData({
        userId: userData.userId,
        companyId: vacancy.companyId,
        vacancyId: vacancy.id,
      });

      router.push("/vacancies");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className=" pt-6">
      <CardContent className="flex justify-between items-center">
        <Button variant="destructive" asChild>
          <a href={`mailto:report.retired451@passmail.net`}>
            <div className="flex items-center gap-1">
              <FlagIcon className="size-4" />
              Пожаловаться
            </div>
          </a>
        </Button>

        {userData ? (
          <Button onClick={handleApply}>Откликнуться</Button>
        ) : (
          <Link href="/dashboard/profile/create">
            Заполните профиль чтобы откликнуться
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
