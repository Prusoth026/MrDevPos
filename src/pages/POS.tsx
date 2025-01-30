import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { ProductList } from "@/components/pos/ProductList";
import { Cart } from "@/components/pos/Cart";
import { format } from "date-fns";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const POS = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const { toast } = useToast();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock product database - replace with real data later
  const mockProducts = [
    { id: "1", name: "Milk", price: 3.99, barcode: "123456" },
    { id: "2", name: "Bread", price: 2.49, barcode: "234567" },
    { id: "3", name: "Eggs", price: 4.99, barcode: "345678" },
  ];

  const handleBarcodeScanned = (barcode: string) => {
    const product = mockProducts.find((p) => p.barcode === barcode);
    if (product) {
      addToCart(product);
      toast({
        title: "Product Added",
        description: `${product.name} has been added to cart`,
      });
    } else {
      toast({
        title: "Product Not Found",
        description: "No product found with this barcode",
        variant: "destructive",
      });
    }
  };

  const addToCart = (product: { id: string; name: string; price: number }) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handlePaymentComplete = () => {
    setShowReceipt(true);
    setCart([]);
  };

  return (
    <DashboardLayout>
      <div className="relative bg-gradient-to-r from-[#FEC6A1] to-[#F97316] min-h-screen">
        <div className="absolute top-0 right-0 p-4 text-right">
          <span className="text-lg font-semibold text-white bg-orange-500/20 px-4 py-2 rounded-lg backdrop-blur-sm">
            {format(currentDateTime, "dd/MM/yyyy HH:mm:ss")}
          </span>
        </div>
        <div className="flex gap-6 h-[calc(100vh-6rem)] mt-12">
          <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <ProductList
              products={mockProducts}
              onProductAdd={addToCart}
              onBarcodeScanned={handleBarcodeScanned}
            />
          </div>
          <Cart
            items={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onPaymentComplete={handlePaymentComplete}
            showReceipt={showReceipt}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default POS;