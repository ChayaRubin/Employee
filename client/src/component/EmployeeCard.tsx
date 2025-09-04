// import React from "react"
// import type { Employee } from "../interface/Employee.ts"
// import {
//   Card,
//   HStack,
//   Stack,
//   Text,
//   Heading,
//   Badge,
//   IconButton,
//   Icon,
// } from "@chakra-ui/react"
// import { FiEdit2, FiTrash2 } from "react-icons/fi"

// type Props = {
//   employee: Employee
//   onEdit: (emp: Employee) => void
//   onDelete: () => void
// }

// const EmployeeCard = ({ employee, onEdit, onDelete }: Props) => {
//   return (
//     <Card.Root maxW="md" w="full" mb={4}>
//       <Card.Header>
//         <HStack justifyContent="space-between" alignItems="center" w="full">
//           <Stack mt={0}>
//             <Heading size="md">{employee.name}</Heading>
//             <Text fontSize="sm" color="fg.muted">
//               {employee.role}
//             </Text>
//           </Stack>

//           <Badge
//             colorPalette={employee.isActive ? "green" : "red"}
//             variant="subtle"
//           >
//             {employee.isActive ? "Active" : "Inactive"}
//           </Badge>
//         </HStack>
//       </Card.Header>

//       <Card.Body>
//         <Text>ID: {employee.id}</Text>
//         <Text>Active: {employee.isActive ? "Yes" : "No"}</Text>
//       </Card.Body>

//       <Card.Footer>
//         <HStack gap="2">
//           <IconButton
//             aria-label="Edit"
//             colorPalette="teal"
//             size="sm"
//             onClick={() => onEdit(employee)}
//           >
//             <Icon as={FiEdit2} />
//           </IconButton>

//           <IconButton
//             aria-label="Delete"
//             colorPalette="red"
//             size="sm"
//             onClick={onDelete}
//           >
//             <Icon as={FiTrash2} />
//           </IconButton>
//         </HStack>
//       </Card.Footer>
//     </Card.Root>
//   )
// }

// export default EmployeeCard
import React, { useState } from "react"
import type { Employee } from "../interface/Employee.ts"
import {
  Card,
  HStack,
  Stack,
  Text,
  Heading,
  Badge,
  IconButton,
  Icon,
  Button,
  Collapsible,
} from "@chakra-ui/react"
import { FiEdit2, FiTrash2 } from "react-icons/fi"

type Props = {
  employee: Employee
  onEdit: (emp: Employee) => void
  onDelete: () => void
}

const EmployeeCard = ({ employee, onEdit, onDelete }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <Card.Root maxW="md" w="full" mb={4}>
      <Card.Header>
        <HStack justifyContent="space-between" alignItems="center" w="full">
          <Stack mt={0}>
            <Heading size="md">{employee.name}</Heading>
            <Text fontSize="sm" color="fg.muted">
              {employee.role}
            </Text>
          </Stack>

          <Badge
            colorPalette={employee.isActive ? "green" : "red"}
            variant="subtle"
          >
            {employee.isActive ? "Active" : "Inactive"}
          </Badge>
        </HStack>
      </Card.Header>

      <Collapsible.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Collapsible.Trigger asChild>
          <Button variant="outline" size="sm" mt={2}>
            {open ? "Hide details" : "Show details"}
          </Button>
        </Collapsible.Trigger>

        <Collapsible.Content>
          <Card.Body>
            <Stack gap="1">
              <Text>ID: {employee.id}</Text>
              <Text>Active: {employee.isActive ? "Yes" : "No"}</Text>
            </Stack>
          </Card.Body>
        </Collapsible.Content>
      </Collapsible.Root>

      <Card.Footer>
        <HStack gap="2">
          <IconButton
            aria-label="Edit"
            colorPalette="teal"
            size="sm"
            onClick={() => onEdit(employee)}
          >
            <Icon as={FiEdit2} />
          </IconButton>

          <IconButton
            aria-label="Delete"
            colorPalette="red"
            size="sm"
            onClick={onDelete}
          >
            <Icon as={FiTrash2} />
          </IconButton>
        </HStack>
      </Card.Footer>
    </Card.Root>
  )
}

export default EmployeeCard
