import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { PaymentProcessor } from "./PaymentProcessor";
import { ReceiptGenerator } from "./ReceiptGenerator";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onPaymentComplete: () => void;
  showReceipt: boolean;
}

export function Cart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onPaymentComplete,
  showReceipt,
}: CartProps) {
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <div className="w-96 bg-background border-l">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          <h2 className="text-xl font-bold">Cart</h2>
        </div>
      </div>

      <div className="flex flex-col h-[calc(100%-10rem)]">
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4"
            >
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onRemoveItem(item.id)}
                >
                  ×
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t space-y-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          
          <div className="flex gap-2">
            <PaymentProcessor
              total={calculateTotal()}
              onPaymentComplete={onPaymentComplete}
            />
            {showReceipt && (
              <ReceiptGenerator
                items={items}
                total={calculateTotal()}
                timestamp={new Date()}
                transactionId={Date.now().toString()}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}