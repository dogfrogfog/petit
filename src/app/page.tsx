import Image from "next/image";
import Link from "next/link";

import { HeaderLogin } from "@/components/header-login";

export default async function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
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

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center px-4 mt-32">
        {/* New tool banner */}
        <div className="bg-black border border-gray-800 rounded-full px-6 py-2 mb-12">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            New tool: Resume Generator
          </span>
        </div>

        {/* Hero Text */}
        <h1 className="text-5xl sm:text-7xl font-serif max-w-4xl mb-6">
          Keep job search active{" "}
          <span className="italic font-light">doing nothing.</span>
        </h1>

        <p className="text-gray-400 text-xl max-w-2xl mb-12">
          Plump takes care of job searching, application and initial
          communication, so you can focus on things you love
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/get-started"
            className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-colors"
          >
            Get started
          </Link>
          <Link
            href="/jobs"
            className="border border-gray-800 px-8 py-3 rounded-full hover:bg-gray-900 transition-colors"
          >
            Browse jobs
          </Link>
        </div>
      </main>
    </div>
  );
}
