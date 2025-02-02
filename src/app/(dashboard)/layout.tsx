import { DashboardSideNavigation } from "@/components/dashboard-side-navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container py-40">
      <div className="flex gap-6 flex-col lg:flex-row">
        <div className="w-full lg:w-80 flex-shrink-0">
          <DashboardSideNavigation />
        </div>

        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
