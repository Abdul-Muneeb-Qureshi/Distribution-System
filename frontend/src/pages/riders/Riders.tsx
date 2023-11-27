import { useState } from "react";
import "./riders.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/addEmployee/Add";
import { GridColDef } from "@mui/x-data-grid";
import { ridersRows } from "../../data";
import { useQuery } from "@tanstack/react-query";

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

// ... (your imports)

// Define an interface for the row
interface riderRow {
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

const riders = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API
  const { isLoading, data } = useQuery({
    queryKey: ["riders"],
    queryFn: () =>
      fetch("http://localhost:3006/api/employee").then((res) => res.json()),
  });

  // Check if data is undefined or still loading
  if (isLoading || data === undefined) {
    return "Loading...";
  }

  // Add 'id' property to each row in the data
  const dataWithId: riderRow[] = data.map(
    (row: riderRow, index: number) => ({
      ...row,
      id: index + 1,
    })
  );

  return (
    <div className="riders">
      <div className="info">
        <h1>Riders</h1>
        <button onClick={() => setOpen(true)}>Add New Riders</button>
      </div>
     
      {/* DataTable with fetched rows */}
      {/* <DataTable slug="prod" columns={columns} rows={dataWithId} /> */}
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default riders;
