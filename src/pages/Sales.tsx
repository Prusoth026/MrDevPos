import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Printer } from "lucide-react";

const Sales = () => {
  const [currentDate] = useState(new Date().toLocaleDateString());
  
  // Mock data for demonstration
  const salesData = {
    totalSales: 2584.50,
    cashSales: 1245.75,
    cardSales: 1338.75,
    totalTransactions: 47,
    averageTicket: 55.00,
    voidTransactions: 2,
    refunds: 125.50,
    taxCollected: 232.60,
    discounts: 85.20,
  };

  const paymentMethods = [
    { method: "Cash", amount: 1245.75, transactions: 22 },
    { method: "Credit Card", amount: 988.75, transactions: 18 },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">X Report</h1>
            <p className="text-muted-foreground">Daily Sales Summary - {currentDate}</p>
          </div>
          <Button onClick={handlePrint} className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print Report
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{salesData.totalSales.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{salesData.totalTransactions}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Ticket</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{salesData.averageTicket.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Method</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Transactions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentMethods.map((payment) => (
                    <TableRow key={payment.method}>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>{payment.amount.toFixed(2)}</TableCell>
                      <TableCell>{payment.transactions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Void Transactions:</span>
                  <span className="font-medium">{salesData.voidTransactions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Refunds:</span>
                  <span className="font-medium">{salesData.refunds.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax Collected:</span>
                  <span className="font-medium">{salesData.taxCollected.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discounts:</span>
                  <span className="font-medium">{salesData.discounts.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Sales;