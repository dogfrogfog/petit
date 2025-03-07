import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Sidemenu } from "@/components/sidemenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pet.it - платформа для создания и поиска проектов",
  description: "Pet.it - платформа для создания и поиска проектов",
  openGraph: {
    title: "Pet.it - платформа для создания и поиска проектов",
    description: "Pet.it - платформа для создания и поиска проектов",
    images: [
      {
        url: "/og.jpg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} relative antialiased min-h-screen`}
        >
          <div className="flex overflow-x-hidden">
            <Sidemenu />
            <main className="flex-1">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
