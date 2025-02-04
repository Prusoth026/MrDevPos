import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, Receipt } from "lucide-react";

interface PaymentProcessorProps {
  total: number;
  onPaymentComplete: () => void;
}

export const PaymentProcessor = ({ total, onPaymentComplete }: PaymentProcessorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [amountPaid, setAmountPaid] = useState("");
  const { toast } = useToast();

  const handlePayment = () => {
    if (paymentMethod === "cash") {
      const paid = parseFloat(amountPaid);
      if (paid >= total) {
        const change = paid - total;
        toast({
          title: "Payment Successful",
          description: `Change due: ${change.toFixed(2)}`,
        });
        onPaymentComplete();
        setIsOpen(false);
      } else {
        toast({
          title: "Insufficient Payment",
          description: "The amount paid is less than the total.",
          variant: "destructive",
        });
      }
    } else {
      // Simulate card payment processing
      setTimeout(() => {
        toast({
          title: "Payment Successful",
          description: "Card payment processed successfully.",
        });
        onPaymentComplete();
        setIsOpen(false);
      }, 1500);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Process Payment
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={paymentMethod === "cash" ? "default" : "outline"}
                onClick={() => setPaymentMethod("cash")}
                className="flex-1"
              >
                Cash
              </Button>
              <Button
                variant={paymentMethod === "card" ? "default" : "outline"}
                onClick={() => setPaymentMethod("card")}
                className="flex-1"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Card
              </Button>
            </div>

            {paymentMethod === "cash" && (
              <div className="space-y-2">
                <Label>Amount Paid</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  placeholder="Enter amount"
                />
                <div className="text-sm text-muted-foreground">
                  Total:{total.toFixed(2)}
                </div>
              </div>
            )}

            <Button onClick={handlePayment} className="w-full">
              Complete Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};