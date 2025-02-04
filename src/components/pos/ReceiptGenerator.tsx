import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Receipt, Printer } from "lucide-react";

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
}

interface ReceiptGeneratorProps {
  items: ReceiptItem[];
  total: number;
  timestamp: Date;
  transactionId: string;
}

export const ReceiptGenerator = ({
  items,
  total,
  timestamp,
  transactionId,
}: ReceiptGeneratorProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Receipt className="mr-2 h-4 w-4" />
          View Receipt
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[400px]">
        <DialogHeader>
          <DialogTitle>Receipt</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 print:p-4">
          <div className="text-center">
            <h2 className="font-bold text-xl">SUPERMARKET POS</h2>
            <p className="text-sm text-muted-foreground">
              {timestamp.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              Transaction ID: {transactionId}
            </p>
          </div>

          <div className="border-t border-b py-4">
            <table className="w-full">
              <thead>
                <tr className="text-sm text-muted-foreground">
                  <th className="text-left">Item</th>
                  <th className="text-right">Qty</th>
                  <th className="text-right">Price</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td className="text-right">{item.quantity}</td>
                    <td className="text-right">{item.price.toFixed(2)}</td>
                    <td className="text-right">
                      {(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{total.toFixed(2)}</span>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Thank you for shopping with us!</p>
          </div>

          <Button onClick={handlePrint} className="w-full print:hidden">
            <Printer className="mr-2 h-4 w-4" />
            Print Receipt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};