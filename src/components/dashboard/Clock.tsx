import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Clock as ClockIcon } from "lucide-react";

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <ClockIcon className="h-8 w-8 text-primary" />
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold">
          {format(time, "hh:mm:ss a")}
        </h3>
        <p className="text-muted-foreground">
          {format(time, "EEEE, MMMM do, yyyy")}
        </p>
      </div>
    </Card>
  );
};