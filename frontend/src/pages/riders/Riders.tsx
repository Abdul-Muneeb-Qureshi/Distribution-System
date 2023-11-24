import { useState } from "react";
import "./riders.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/addEmployee/Add";
import { GridColDef } from "@mui/x-data-grid";
import { ridersRows } from "../../data";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    type: "string",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
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

const riders = () => {
  const [open, setOpen] = useState(false);

  // TEST THE API

  /* commenting for some time */

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allproducts"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/products").then(
  //       (res) => res.json()
  //     ),
  // });

  return (
    <div className="riders">
      <div className="info">
        <h1>Riders</h1>
        <button onClick={() => setOpen(true)}>Add New Riders</button>
      </div>
      <DataTable slug="products" columns={columns} rows={ridersRows} />
      {/* TEST THE API */}
      {/* commenting for some time */}
      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default riders;
