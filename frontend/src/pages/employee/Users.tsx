import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { useState } from "react";
import Add from "../../components/addEmployee/Add";
import { userRows } from "../../data";
import { useQuery } from "@tanstack/react-query";
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstname",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastname",
    type: "string",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 150,
    type: "boolean",
  },
];
// Define an interface for the row
interface EmployeeRow {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  phoneNumber: string;
}
const Users = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API
  const { isLoading, data } = useQuery({
    queryKey: ["employees"],
    queryFn: () =>
      fetch("http://localhost:3006/api/employee").then((res) => res.json()),
  });

  // Function to handle delete operation
  const handleDelete = async (id: number) => {
    try {
      // Call the delete API endpoint
      await fetch(`http://localhost:3006/api/employee/${id}`, {
        method: "DELETE",
      });

      // Update the state or refetch data as needed
      // For example, you can refetch the data using react-query or other state management tools

      console.log(`Employee with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting employee`);
    }
  };
  // Check if data is undefined or still loading
  if (isLoading || data === undefined) {
    return "Loading...";
  }

  // Add 'id' property to each row in the data
  const dataWithId: EmployeeRow[] = data.map(
    (row: EmployeeRow, index: number) => ({
      ...row,
      id: index + 1,
    })
  );

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>

      {/* DataTable with fetched rows */}
      <DataTable
        slug="prod"
        columns={columns}
        rows={dataWithId}
        onDelete={handleDelete}
      />

      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
