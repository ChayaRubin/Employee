import type { Employee } from "../interface/Employee";

export function EmployeeCard( employee : Employee) {
  return (
    <>
      <h4>{employee.id}</h4>
      <h4>{employee.name}</h4>
      <h4>{employee.role}</h4>
      <h4>{employee.isActive ? "Active" : "Inactive"}</h4>
    </>
  );
}