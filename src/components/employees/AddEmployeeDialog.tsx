import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Employee } from "@/types/employee";
import { useState } from "react";

interface AddEmployeeDialogProps {
  onAddEmployee: (employee: Omit<Employee, "id" | "status">) => void;
}

export function AddEmployeeDialog({ onAddEmployee }: AddEmployeeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    schedule: "",
  });

  const handleSubmit = () => {
    onAddEmployee(formData);
    setFormData({ name: "", email: "", role: "", schedule: "" });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Employee</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription>Add a new employee to your team</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Cashier">Cashier</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="schedule">Work Schedule</Label>
            <Select
              value={formData.schedule}
              onValueChange={(value) =>
                setFormData({ ...formData, schedule: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select schedule" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="9:00 AM - 5:00 PM">
                  9:00 AM - 5:00 PM
                </SelectItem>
                <SelectItem value="8:00 AM - 4:00 PM">
                  8:00 AM - 4:00 PM
                </SelectItem>
                <SelectItem value="2:00 PM - 10:00 PM">
                  2:00 PM - 10:00 PM
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Add Employee
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}