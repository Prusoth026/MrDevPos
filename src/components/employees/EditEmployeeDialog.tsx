import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { useEffect, useState } from "react";

interface EditEmployeeDialogProps {
  employee: Employee | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateEmployee: (employee: Employee) => void;
}

export function EditEmployeeDialog({
  employee,
  isOpen,
  onOpenChange,
  onUpdateEmployee,
}: EditEmployeeDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    schedule: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        role: employee.role,
        schedule: employee.schedule,
      });
    }
  }, [employee]);

  const handleSubmit = () => {
    if (employee) {
      onUpdateEmployee({
        ...employee,
        ...formData,
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogDescription>Update employee information</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-role">Role</Label>
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
            <Label htmlFor="edit-schedule">Work Schedule</Label>
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
            Update Employee
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}