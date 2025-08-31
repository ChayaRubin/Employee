import type { Employee } from "./interface/Employee"
import './App.css'
import { EmployeeCard } from "./component/EmployeeCard"

function App() {
   const employees: Employee[] = [
    { id: 1, name: 'Chaya', role: "manager", isActive: true },
    { id: 2, name: 'Miri', role: "employee", isActive: true },
    { id: 3, name: 'Rivka', role: "employee", isActive: true }
  ];

  return (
    <>
      {
        employees.map((employee)=>(
        <div><EmployeeCard {...employee}/></div>
      ))
      }
    </>
  )
}

export default App
