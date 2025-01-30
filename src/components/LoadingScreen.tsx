import { Loader2 } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#9b87f5] to-[#7E69AB]">
      <div className="space-y-4 text-center bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl">
        <Loader2 className="h-12 w-12 animate-spin text-white mx-auto" />
        <h2 className="text-2xl font-bold text-white">Mr Dev POS</h2>
        <p className="text-white/80">Loading your experience...</p>
      </div>
    </div>
  );
}