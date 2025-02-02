import Link from "next/link";
import Image from "next/image";
import { SignedIn } from "@clerk/nextjs";

import { HeaderLogin } from "@/components/header-login";

export function Navigation() {
  return (
    <nav className="border-foreground border rounded-xl w-full lg:w-[900px] bg-background text-foreground fixed top-2 lg:top-10 left-1/2 -translate-x-1/2">
      <div className="flex flex-row items-center justify-between px-4 md:px-8 py-4 gap-4 md:gap-4">
        <Link href="/" className="h-10 w-7 flex items-center justify-center">
          <Image src="/logo.png" alt="Logo" width={27} height={35} />
        </Link>
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          <SignedIn>
            <Link href="/vacancies" className="text-foreground">
              Работа
            </Link>
            <Link href="/companies" className="text-foreground">
              Компании
            </Link>
            <Link
              href="https://t.me/petIT_colab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground"
            >
              Контакты
            </Link>
            <Link href="/dashboard" className="text-foreground">
              Дашборд
            </Link>
          </SignedIn>
          <HeaderLogin />
        </div>
      </div>
    </nav>
  );
}
