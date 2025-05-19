import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

type Employee = {
  id: string;
  name: string;
  position: string;
  department: string;
  joiningDate: string;
  isActive: boolean;
};

type EmployeeState = {
  employees: Employee[];

  addEmployee: (employee: Employee) => void;
  deleteEmployee: (employeeId: string) => void;
  updateEmployee: (employeeId: string, updatedData: Partial<Employee>) => void;
  toggleActiveStatus: (employeeId: string) => void;
  clearEmployees: () => void;
};

export const employeeStore = create<EmployeeState>()(
  persist(
    immer((set) => ({
      employees: [],

      addEmployee: (employee) =>
        set((state) => {
          state.employees.push(employee);
        }),

      deleteEmployee: (employeeId) =>
        set((state) => {
          state.employees = state.employees.filter(
            (emp: any) => emp.id !== employeeId
          );
        }),
      updateEmployee: (employeeId, updatedData) =>
        set((state) => {
          const employee = state.employees.find(
            (emp: any) => emp.id == employeeId
          );
          if (employee) {
            Object.assign(employee, updatedData);
          } else {
            return null;
          }
        }),

      toggleActiveStatus: (employeeId) =>
        set((state) => {
          const employee = state.employees.find(
            (emp: any) => emp.id === employeeId
          );
          if (employee) {
            employee.isActive = !employee.isActive;
          }
        }),

      clearEmployees: () =>
        set((state) => {
          state.employees = [];
        }),
    })),
    {
      name: "employee-storage", // localStorage key
    }
  )
);
