import type { Employee } from "../interface/Employee";

export function EmployeeCard({ id, name, role, isActive }: Employee) {
  return (
    <>
      <h4>{id}</h4>
      <h4>{name}</h4>
      <h4>{role}</h4>
      <h4>{isActive ? "Active" : "Inactive"}</h4>
    </>
  );
}