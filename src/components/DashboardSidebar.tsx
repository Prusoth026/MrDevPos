import {
  LayoutDashboard,
  Users,
  Package,
  Receipt,
  LogOut,
  UserCog,
  PackageOpen,
  ShoppingCart,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const adminMenuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Products", icon: Package, path: "/products" },
  { title: "Stock", icon: PackageOpen, path: "/stock" },
  { title: "Customers", icon: Users, path: "/customers" },
  { title: "Sales", icon: Receipt, path: "/sales" },
  { title: "Employees", icon: UserCog, path: "/employees" },
];

const employeeMenuItems = [
  { title: "POS", icon: ShoppingCart, path: "/pos" },
];

// Summary counts for stock status
const stockSummary = {
  totalProducts: 525,
  availableStock: 450,
  lowStock: 75
};

export function DashboardSidebar() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const menuItems = userRole === "admin" ? adminMenuItems : employeeMenuItems;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-2xl font-bold text-primary">DeltaPOS</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {userRole === "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel>Stock Summary</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <div className="px-3 py-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Products</span>
                        <span className="text-sm font-medium">{stockSummary.totalProducts}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-green-600">Available Stock</span>
                        <span className="text-sm font-medium text-green-600">{stockSummary.availableStock}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-red-600">Low Stock</span>
                        <span className="text-sm font-medium text-red-600">{stockSummary.lowStock}</span>
                      </div>
                    </div>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="text-red-500"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}