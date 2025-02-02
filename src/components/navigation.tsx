import Link from "next/link";
import Image from "next/image";
import { SignedIn } from "@clerk/nextjs";

import { HeaderLogin } from "@/components/header-login";

export function Navigation() {
  return (
    <nav className="border-foreground border rounded-xl w-[98%] bg-background text-foreground mx-auto">
      <div className="flex flex-row items-center justify-between px-4 md:px-8 py-4 gap-4 md:gap-4">
        <Link href="/" className="h-10 w-32 flex items-center justify-center">
          <Image src="/logo.svg" alt="Logo" width={150} height={50} />
        </Link>
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          <SignedIn>
            <Link href="/vacancies" className="text-foreground">
              Работа
            </Link>
            <Link href="/projects" className="text-foreground">
              Проекты
            </Link>
            <Link href="/companies" className="text-foreground">
              Наши партнеры
            </Link>
            <Link
              href="https://t.me/petIT_colab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground"
            >
              Контакты
            </Link>
          </SignedIn>
          <HeaderLogin />
        </div>
      </div>
    </nav>
  );
}
