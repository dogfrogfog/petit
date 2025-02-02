import Link from "next/link";
import Image from "next/image";

import { HeaderLogin } from "@/components/header-login";

export function Navigation() {
  return (
    <nav className="border-background border rounded-xl lg:max-w-3xl bg-foreground text-background fixed top-2 lg:top-10 left-1/2 -translate-x-1/2">
      <div className="flex flex-row items-center px-4 md:px-8 py-4 gap-4 md:gap-4">
        <Link href="/" className="h-10 w-7 flex items-center justify-center">
          <Image src="/logo.png" alt="Logo" width={27} height={35} />
        </Link>
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          <Link href="/vacancies" className="text-gray-300 hover:text-white">
            Работа
          </Link>
          <Link href="/companies" className="text-gray-300 hover:text-white">
            Компании
          </Link>
          <Link
            href="https://t.me/petIT_colab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            Контакты
          </Link>
          <Link href="/dashboard" className="text-gray-300 hover:text-white">
            Дашборд
          </Link>
          <HeaderLogin />
        </div>
      </div>
    </nav>
  );
}
