import Link from "next/link";
import Image from "next/image";

import { HeaderLogin } from "@/components/header-login";

export function Navigation() {
  return (
    <nav className="flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-8">
        <Link href="/">
          <Image
            src="/plump-logo.svg" // You'll need to add your logo
            alt="Logo"
            width={32}
            height={32}
            className="text-white"
          />
        </Link>
        <div className="hidden sm:flex gap-8">
          <Link href="/jobs" className="text-gray-300 hover:text-white">
            Jobs
          </Link>
          <Link href="/companies" className="text-gray-300 hover:text-white">
            Companies
          </Link>
          <Link href="/resume" className="text-gray-300 hover:text-white">
            Resume 2.0
          </Link>
          <Link href="/pricing" className="text-gray-300 hover:text-white">
            Pricing
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white">
            Contact
          </Link>
          <Link href="/blog" className="text-gray-300 hover:text-white">
            Blog
          </Link>
        </div>
      </div>
      <HeaderLogin />
    </nav>
  );
}
