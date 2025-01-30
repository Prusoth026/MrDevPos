import { PackageOpen, AlertTriangle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface StockItem {
  name: string;
  quantity: number;
}

interface StockStatusProps {
  available: StockItem[];
  lowStock: StockItem[];
}

export function StockStatusSection({ available, lowStock }: StockStatusProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Stock Status</SidebarGroupLabel>
      <SidebarGroupContent>
        <ScrollArea className="h-[200px]">
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="px-3 py-2">
                <div className="flex items-center gap-2 text-green-500 mb-2">
                  <PackageOpen className="h-5 w-5" />
                  <span className="font-medium">Available Stock</span>
                </div>
                <div className="space-y-1 ml-7">
                  {available.map((item) => (
                    <div key={item.name} className="text-sm flex justify-between">
                      <span>{item.name}</span>
                      <span className="text-green-500">{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <div className="px-3 py-2">
                <div className="flex items-center gap-2 text-red-500 mb-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-medium">Low Stock Alert</span>
                </div>
                <div className="space-y-1 ml-7">
                  {lowStock.map((item) => (
                    <div key={item.name} className="text-sm flex justify-between">
                      <span>{item.name}</span>
                      <span className="text-red-500">{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </ScrollArea>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}