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
  // {
  //   field: "img",
  //   headerName: "Avatar",
  //   width: 100,
  //   renderCell: (params) => {
  //     return <img src={params.row.img || "/noavatar.png"} alt="" />;
  //   },
  // },
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

const Users = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API
  const { isLoading, data } = useQuery({
    queryKey: ["employees"],
    queryFn: () =>
      fetch("http://localhost:3006/api/employee").then((res) => res.json()),
  });

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>

      {isLoading ? (
        "Loading..."
      ) : (
        <DataGrid
          columns={columns}
          rows={data}
          autoPageSize // Automatically adjust the page size
          getRowId={(row) => row._id} // Specify the unique identifier field
        />
      )}

      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
/*import { GridColDef, DataGrid } from "@mui/x-data-grid";
import "./Users.scss";
import { useState } from "react";
import Add from "../../components/addEmployee/Add";
import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  // Your columns definition
];

const Users = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API
  const { isLoading, data } = useQuery({
    queryKey: ["employees"],
    queryFn: () =>
      fetch("http://localhost:3006/api/employee").then((res) => res.json()),
  });

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <DataGrid
          columns={columns}
          rows={data}
          autoPageSize // Automatically adjust the page size
          getRowId={(row) => row._id} // Specify the unique identifier field
        />
      )}
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
 */
