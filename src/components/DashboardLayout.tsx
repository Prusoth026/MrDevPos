import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import { useLocation } from "react-router-dom";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isPOSRoute = location.pathname === "/pos";

  return (
    <SidebarProvider>
      <div className={`min-h-screen flex w-full ${isPOSRoute ? 'bg-pos-gradient' : 'bg-dashboard-gradient'}`}>
        {!isPOSRoute && <DashboardSidebar />}
        <main className={`flex-1 p-6 overflow-auto ${isPOSRoute ? 'w-full' : ''}`}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}