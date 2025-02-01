import Link from "next/link";
import Image from "next/image";

import { HeaderLogin } from "@/components/header-login";

export function Navigation() {
  return (
    <nav className="border-background border rounded-xl max-w-3xl bg-foreground text-background flex items-center px-8 py-4 fixed top-10 left-1/2 -translate-x-1/2 gap-10">
      <Link href="/" className="h-10 w-7 flex items-center justify-center">
        <Image src="/logo.png" alt="Logo" width={27} height={35} />
      </Link>
      <Link href="/vacancies" className="text-gray-300 hover:text-white">
        Работа
      </Link>
      <Link href="/companies" className="text-gray-300 hover:text-white">
        Компании
      </Link>
      <Link href="/contact" className="text-gray-300 hover:text-white">
        Контакты
      </Link>
      <HeaderLogin />
    </nav>
  );
}
