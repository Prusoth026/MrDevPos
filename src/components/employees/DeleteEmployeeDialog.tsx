import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Employee } from "@/types/employee";

interface DeleteEmployeeDialogProps {
  employee: Employee | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteEmployee: (employee: Employee) => void;
}

export function DeleteEmployeeDialog({
  employee,
  isOpen,
  onOpenChange,
  onDeleteEmployee,
}: DeleteEmployeeDialogProps) {
  const handleDelete = () => {
    if (employee) {
      onDeleteEmployee(employee);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Employee</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this employee? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-4 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}