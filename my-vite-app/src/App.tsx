import type { Employee } from "./interface/Employee"
import './App.css'
import { EmployeeCard } from "./component/EmployeeCard"

function App() {
   const employee1:Employee={
    id:1,
    name:'Chaya',
     role:"manager",
    isActive:true
   }
   const employee2:Employee={
    id:2,
    name:'Miri',
     role:"employee",
    isActive:true
   }
   const employee3:Employee={
    id:3,
    name:'Rivka',
     role:"employee",
    isActive:true
   }
   const employees:Employee[]=[employee1,employee2,employee3];
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
