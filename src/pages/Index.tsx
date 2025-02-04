import { Card } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Clock } from "@/components/dashboard/Clock";
import {
  TrendingUp,
  Users,
  Package,
  Receipt,
} from "lucide-react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dummy data for demonstration
const salesData = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 2000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 1890 },
  { name: "Sat", sales: 2390 },
  { name: "Sun", sales: 3490 },
];

const stats = [
  { title: "Total Sales", value: "Rs 24,12,345.00", icon: TrendingUp, change: "+12%", color: "text-green-500" },
  { title: "Active Customers", value: "1,234", icon: Users, change: "+3%", color: "text-blue-500" },
  { title: "Products", value: "4567", icon: Package, change: "+5%", color: "text-purple-500" },
  { title: "Transactions", value: "1256", icon: Receipt, change: "+8%", color: "text-orange-500" },
];

const recentTransactions = [
  { id: 1, customer: "Nizmi", amount: "Rs 43,800.00", status: "Completed", date: "20-03-2024" },
  { id: 2, customer: "Thuva", amount: "Rs 31,207.50", status: "Completed", date: "20-03-2024" },
  { id: 3, customer: "Bavi", amount: "Rs 73,000.00", status: "Pending", date: "19-03-2024" },
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Mr Dev Pos Admin</p>
        </div>

        {/* Clock */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Clock />
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <stat.icon className="h-8 w-8 text-primary" />
                <span className={`text-sm font-medium ${stat.color}`}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.title}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts and Tables Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Sales Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Weekly Sales</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#F97316" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Recent Transactions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between border-b pb-2 last:border-0"
                >
                  <div>
                    <p className="font-medium">{transaction.customer}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{transaction.amount}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;