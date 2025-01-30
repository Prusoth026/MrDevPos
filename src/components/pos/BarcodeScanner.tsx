import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Barcode, Scan } from "lucide-react";

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
}

export const BarcodeScanner = ({ onScan }: BarcodeScannerProps) => {
  const [barcode, setBarcode] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  // Handle manual barcode input
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (barcode) {
      onScan(barcode);
      setBarcode("");
    }
  };

  // Handle keyboard input (simulating barcode scanner)
  useEffect(() => {
    let barcodeBuffer = "";
    let lastKeyTime = 0;
    const BARCODE_DELAY = 50; // Maximum delay between keystrokes for barcode

    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isScanning) return;
      
      const currentTime = new Date().getTime();
      if (currentTime - lastKeyTime > BARCODE_DELAY) {
        barcodeBuffer = "";
      }
      
      if (e.key === "Enter") {
        if (barcodeBuffer) {
          onScan(barcodeBuffer);
          barcodeBuffer = "";
        }
      } else {
        barcodeBuffer += e.key;
      }
      
      lastKeyTime = currentTime;
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [isScanning, onScan]);

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Enter barcode manually..."
          className="flex-1"
        />
        <Button type="submit" variant="outline">
          <Barcode className="mr-2 h-4 w-4" />
          Enter
        </Button>
      </form>
      <Button
        onClick={() => setIsScanning(!isScanning)}
        variant={isScanning ? "default" : "outline"}
        className="w-full"
      >
        <Scan className="mr-2 h-4 w-4" />
        {isScanning ? "Scanner Active" : "Start Scanner"}
      </Button>
    </div>
  );
};