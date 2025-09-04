// import React, { useState } from "react";
// import type { FC } from "react";
// import type { Employee } from "./interface/Employee"; // adjust path if this file lives elsewhere
// import {
//   Heading,
//   Button,
//   HStack,
//   Field,
//   Input,
//   Stack,
//   Checkbox,
//   Container,
//   Toaster,
//   createToaster,
//   Toast,
//   useDisclosure,
//   Drawer,
//   SimpleGrid,
//   Box,
//   Text,
//   Spinner,
// } from "@chakra-ui/react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import EmployeeCard from "./component/EmployeeCard"; // expects { employee, onEdit, onDelete }

// const toaster = createToaster({ placement: "top" });
// const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

// const App: FC = () => {
//   // Drawer + form state
//   const [form, setForm] = useState<Omit<Employee, "id">>({
//     name: "",
//     role: "",
//     isActive: true,
//   });
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const { open, setOpen, onOpen, onClose } = useDisclosure();

//   // React Query
//   const queryClient = useQueryClient();
//   const employeesQuery = useQuery<Employee[]>({
//     queryKey: ["employees"],
//     queryFn: async () => {
//       await wait(1000); 
//       const res = await fetch("http://localhost:3000/employees");
//       if (!res.ok) throw new Error("Failed to fetch employees");
//       return res.json();
//     },
//   });

//   if (employeesQuery.isLoading) {
//     return (
//       <Container maxW="container.md" py={10}>
//         <Spinner size="xl" />
//       </Container>
//     );
//   }
//   if (employeesQuery.isError) {
//     return (
//       <Container maxW="container.md" py={10}>
//         <Box bg="red.100" border="1px solid" borderColor="red.300" p={4} rounded="md">
//           <Text color="red.700" fontWeight="bold">Error</Text>
//           <Text>{(employeesQuery.error as Error).message}</Text>
//         </Box>
//       </Container>
//     );
//   }

//   const openAddDrawer = () => {
//     setEditingId(null);
//     setForm({ name: "", role: "", isActive: true });
//     onOpen();
//   };

//   const openEditDrawer = (emp: Employee) => {
//     setEditingId(emp.id);
//     setForm({ name: emp.name, role: emp.role, isActive: emp.isActive });
//     onOpen();
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (editingId) {
//       await fetch(`http://localhost:3000/employees/${editingId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       toaster.create({
//         title: "Updated Successfully",
//         description: `${form.name} has been updated`,
//         type: "success",
//         duration: 2000,
//       });
//     } else {
//       await fetch("http://localhost:3000/employees", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       toaster.create({
//         title: "Added Successfully",
//         description: `${form.name} has been added to the list`,
//         type: "success",
//         duration: 2000,
//       });
//     }

//     onClose();
//     setEditingId(null);
//     queryClient.invalidateQueries({ queryKey: ["employees"] });
//   };

//   const handleDelete = async (id: number) => {
//     await fetch(`http://localhost:3000/employees/${id}`, { method: "DELETE" });
//     toaster.create({ title: "נמחק בהצלחה", type: "success", duration: 2000 });
//     queryClient.invalidateQueries({ queryKey: ["employees"] });
//   };

//   const data = employeesQuery.data ?? [];

//   return (
//     <Container maxW="container.md" py={10}>
//       <Toaster toaster={toaster}>
//         {(t) => (
//           <Toast.Root>
//             <Toast.Title>{t.title}</Toast.Title>
//             {t.description ? <Toast.Description>{t.description}</Toast.Description> : null}
//             <Toast.CloseTrigger />
//           </Toast.Root>
//         )}
//       </Toaster>

//       <Heading as="h1" size="xl" mb={6}>
//         List Of Employees
//       </Heading>

//       {/* כפתורי פעולה למעלה */}
// <HStack mb={4} gap="3">
//   <Button colorPalette="teal" onClick={openAddDrawer}>
//     Add Employee
//   </Button>

//   <Button
//     variant="outline"
//     onClick={() => employeesQuery.refetch()}
//     disabled={employeesQuery.isFetching}
//   >
//     {employeesQuery.isFetching ? "Refreshing..." : "Refresh"}
//   </Button>
// </HStack>


//       {/* Render fetched employees */}
//       <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={4}>
//         {data.map((emp) => (
//           <EmployeeCard
//             key={emp.id}
//             employee={emp}
//             onEdit={openEditDrawer}
//             onDelete={() => handleDelete(emp.id)}
//           />
//         ))}
//       </SimpleGrid>

//       {/* Drawer (Chakra v3 / Ark-style) */}
//       <Drawer.Root
//         open={open}
//         onOpenChange={(d) => setOpen(d.open)}
//         placement="end"
//         size="sm"
//       >
//         <Drawer.Backdrop />
//         <Drawer.Positioner>
//           <Drawer.Content display="flex" flexDirection="column" maxH="100vh">
//             <Drawer.Header>
//               {editingId ? "Edit Employee" : "Add Employee"}
//               <Drawer.CloseTrigger />
//             </Drawer.Header>

//             <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
//               <Drawer.Body flex="1" overflowY="auto">
//                 <Stack gap="4" w="full">
//                   <Field.Root>
//                     <Field.Label>שם</Field.Label>
//                     <Input
//                       placeholder="employee name"
//                       value={form.name}
//                       onChange={(e) => setForm({ ...form, name: e.target.value })}
//                       required
//                     />
//                   </Field.Root>

//                   <Field.Root>
//                     <Field.Label>Role</Field.Label>
//                     <Input
//                       placeholder="employee role"
//                       value={form.role}
//                       onChange={(e) => setForm({ ...form, role: e.target.value })}
//                       required
//                     />
//                   </Field.Root>

//                   <Field.Root>
//                     <Checkbox.Root
//                       checked={form.isActive}
//                       onCheckedChange={(d: any) => {
//                         // d can be { checked } or a native event from HiddenInput
//                         const next =
//                           d && typeof d === "object" && "checked" in d
//                             ? d.checked
//                             : d?.target?.checked;
//                         setForm((prev) => ({ ...prev, isActive: next === true }));
//                       }}
//                       cursor="pointer"
//                     >
//                       <Checkbox.Control>
//                         <Checkbox.Indicator />
//                       </Checkbox.Control>
//                       <Checkbox.Label>Active?</Checkbox.Label>
//                       <Checkbox.HiddenInput name="isActive" />
//                     </Checkbox.Root>
//                   </Field.Root>
//                 </Stack>
//               </Drawer.Body>

//               <Drawer.Footer borderTopWidth="1px">
//                 <HStack>
//                   <Button variant="outline" onClick={onClose} type="button">
//                     cancel
//                   </Button>
//                   <Button colorPalette="teal" type="submit">
//                     {editingId ? "Save Changes" : "Add Employee"}
//                   </Button>
//                 </HStack>
//               </Drawer.Footer>
//             </form>
//           </Drawer.Content>
//         </Drawer.Positioner>
//       </Drawer.Root>
//     </Container>
//   );
// };

// export default App;
// src/App.tsx (or src/component/EmployeesPage.tsx)
import React, { useState } from "react";
import type { FC } from "react";
import type { Employee } from "./interface/Employee";
import {
  Heading,
  Button,
  HStack,
  Field,
  Input,
  Stack,
  Checkbox,
  Container,
  Toaster,
  createToaster,
  Toast,
  useDisclosure,
  Drawer,
  SimpleGrid,
  Box,
  Text,
  Spinner,
  Progress,
  Spacer,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import EmployeeCard from "./component/EmployeeCard";

const toaster = createToaster({ placement: "top" });
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const App: FC = () => {
  // Drawer + form state
  const [form, setForm] = useState<Omit<Employee, "id">>({
    name: "",
    role: "",
    isActive: true,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const { open, setOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();
  const employeesQuery = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: async () => {
      await wait(1000); 
      const res = await fetch("http://localhost:3000/employees");
      if (!res.ok) throw new Error("Failed to fetch employees");
      return res.json();
    },
  });

  if (employeesQuery.isLoading) {
    return (
      <Container maxW="container.md" py={10}>
        <Spinner size="xl" />
      </Container>
    );
  }
  if (employeesQuery.isError) {
    return (
      <Container maxW="container.md" py={10}>
        <Box bg="red.100" border="1px solid" borderColor="red.300" p={4} rounded="md">
          <Text color="red.700" fontWeight="bold">Error</Text>
          <Text>{(employeesQuery.error as Error).message}</Text>
        </Box>
      </Container>
    );
  }

  // Handlers
  const openAddDrawer = () => {
    setEditingId(null);
    setForm({ name: "", role: "", isActive: true });
    onOpen();
  };

  const openEditDrawer = (emp: Employee) => {
    setEditingId(emp.id);
    setForm({ name: emp.name, role: emp.role, isActive: emp.isActive });
    onOpen();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      await fetch(`http://localhost:3000/employees/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      toaster.create({
        title: "Updated Successfully",
        description: `${form.name} has been updated`,
        type: "success",
        duration: 2000,
      });
    } else {
      await fetch("http://localhost:3000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      toaster.create({
        title: "Added Successfully",
        description: `${form.name} has been added to the list`,
        type: "success",
        duration: 2000,
      });
    }

    onClose();
    setEditingId(null);
    queryClient.invalidateQueries({ queryKey: ["employees"] });
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/employees/${id}`, { method: "DELETE" });
    toaster.create({ title: "נמחק בהצלחה", type: "success", duration: 2000 });
    queryClient.invalidateQueries({ queryKey: ["employees"] });
  };

  const data = employeesQuery.data ?? [];

  return (
    <Container maxW="container.md" py={10}>
      {/* Toasts */}
      <Toaster toaster={toaster}>
        {(t) => (
          <Toast.Root>
            <Toast.Title>{t.title}</Toast.Title>
            {t.description ? <Toast.Description>{t.description}</Toast.Description> : null}
            <Toast.CloseTrigger />
          </Toast.Root>
        )}
      </Toaster>

      <HStack mb={4} align="center">
        <Heading as="h1" size="xl">List Of Employees</Heading>
        <Spacer />
        {employeesQuery.isFetching ? <Spinner size="sm" /> : null}
        <Button colorPalette="teal" onClick={openAddDrawer}>Add Employee</Button>
        <Button
          variant="outline"
          onClick={() => wait(1000).then(() => employeesQuery.refetch())}
          disabled={employeesQuery.isFetching}
        >
          {employeesQuery.isFetching ? "Refreshing..." : "Refresh"}
        </Button>
      </HStack>

      {/* Thin progress bar while refetching */}
      {/* {employeesQuery.isFetching && (
        // <Progress size="xs" isIndeterminate mb={3} />
      )} */}

      {/* Grid dims slightly while fetching */}
      <Box opacity={employeesQuery.isFetching ? 0.7 : 1} transition="opacity .2s">
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={2}>
          {data.map((emp) => (
            <EmployeeCard
              key={emp.id}
              employee={emp}
              onEdit={openEditDrawer}
              onDelete={() => handleDelete(emp.id)}
            />
          ))}
        </SimpleGrid>
      </Box>

      {/* Drawer (Chakra v3 / Ark-style) */}
      <Drawer.Root
        open={open}
        onOpenChange={(d) => setOpen(d.open)}
        placement="end"
        size="sm"
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content display="flex" flexDirection="column" maxH="100vh">
            <Drawer.Header>
              {editingId ? "Edit Employee" : "Add Employee"}
              <Drawer.CloseTrigger />
            </Drawer.Header>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <Drawer.Body flex="1" overflowY="auto">
                <Stack gap="4" w="full">
                  <Field.Root>
                    <Field.Label>שם</Field.Label>
                    <Input
                      placeholder="employee name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Role</Field.Label>
                    <Input
                      placeholder="employee role"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      required
                    />
                  </Field.Root>

                  <Field.Root>
                    <Checkbox.Root
                      checked={form.isActive}
                      onCheckedChange={(d: any) => {
                        // d can be { checked } or a native event from HiddenInput
                        const next =
                          d && typeof d === "object" && "checked" in d
                            ? d.checked
                            : d?.target?.checked;
                        setForm((prev) => ({ ...prev, isActive: next === true }));
                      }}
                      cursor="pointer"
                    >
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                      <Checkbox.Label>Active?</Checkbox.Label>
                      <Checkbox.HiddenInput name="isActive" />
                    </Checkbox.Root>
                  </Field.Root>
                </Stack>
              </Drawer.Body>

              <Drawer.Footer borderTopWidth="1px">
                <HStack>
                  <Button variant="outline" onClick={onClose} type="button">
                    cancel
                  </Button>
                  <Button colorPalette="teal" type="submit">
                    {editingId ? "Save Changes" : "Add Employee"}
                  </Button>
                </HStack>
              </Drawer.Footer>
            </form>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Container>
  );
};

export default App;
