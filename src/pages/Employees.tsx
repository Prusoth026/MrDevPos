import { DashboardLayout } from "@/components/DashboardLayout";
import { useState } from "react";
import { toast } from "sonner";
import { Employee } from "@/types/employee";
import { AddEmployeeDialog } from "@/components/employees/AddEmployeeDialog";
import { EditEmployeeDialog } from "@/components/employees/EditEmployeeDialog";
import { DeleteEmployeeDialog } from "@/components/employees/DeleteEmployeeDialog";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "Rajees",
    email: "rajees@gmail.com",
    role: "Cashier",
    schedule: "9:00 AM - 5:00 PM",
    status: "Active",
  },
  {
    id: 2,
    name: "Muhila",
    email: "muhila@gmail.com",
    role: "Manager",
    schedule: "8:00 AM - 4:00 PM",
    status: "Active",
  },
];

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEmployee = (employeeData: Omit<Employee, "id" | "status">) => {
    const newEmployee: Employee = {
      id: employees.length + 1,
      ...employeeData,
      status: "Active",
    };

    setEmployees([...employees, newEmployee]);
    toast.success("Employee added successfully");
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    const updatedEmployees = employees.map((emp) =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );

    setEmployees(updatedEmployees);
    toast.success("Employee updated successfully");
  };

  const handleDeleteEmployee = (employeeToDelete: Employee) => {
    const filteredEmployees = employees.filter(
      (emp) => emp.id !== employeeToDelete.id
    );

    setEmployees(filteredEmployees);
    toast.success("Employee deleted successfully");
  };

  const openEditDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Employees</h1>
            <p className="text-muted-foreground">Manage your POS system users</p>
          </div>
          <AddEmployeeDialog onAddEmployee={handleAddEmployee} />
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <EmployeeTable
          employees={filteredEmployees}
          onEditEmployee={openEditDialog}
          onDeleteEmployee={openDeleteDialog}
        />

        <EditEmployeeDialog
          employee={selectedEmployee}
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onUpdateEmployee={handleUpdateEmployee}
        />

        <DeleteEmployeeDialog
          employee={selectedEmployee}
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onDeleteEmployee={handleDeleteEmployee}
        />
      </div>
    </DashboardLayout>
  );
};

export default Employees;
