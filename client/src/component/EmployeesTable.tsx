import React from "react";
import { useQuery } from "@tanstack/react-query";

interface Employee {
  id: number;
  name: string;
  role: string;
  isActive: boolean;
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function EmployeesTable() {
  const employeesQuery = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: () =>
      wait(1000).then(() =>
        fetch("http://localhost:3000/employees").then(res => {
          if (!res.ok) throw new Error("Failed to fetch employees");
          return res.json();
        })
      ),
  });

  if (employeesQuery.isLoading) return <div>Loading...</div>;
  if (employeesQuery.isError) {
    return <div>Error: {(employeesQuery.error as Error).message}</div>;
  }

  return (
    <table border={1} cellPadding={8} style={{ marginTop: "1rem" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {employeesQuery.data?.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>{emp.name}</td>
            <td>{emp.role}</td>
            <td>{emp.isActive ? "Active" : "Inactive"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export { EmployeesTable };