import Breadcrumb from "@/components/main/breadcrumb";
import Header from "@/components/main/header";
import Sidebar from "@/components/main/sidebar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <div className="shrink-0">
          <Header />
        </div>
        <main className="flex-1 overflow-y-auto">
          <Breadcrumb />
          <div className="h-full p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
