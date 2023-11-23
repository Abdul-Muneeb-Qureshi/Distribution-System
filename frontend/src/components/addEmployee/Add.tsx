import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add: React.FC<Props> = (props) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure all required fields are included in the form data
    const currentDate = new Date().toISOString();
    const requestData = {
      ...formData,
      createdAt: currentDate,
    };

    try {
      const response = await fetch("http://localhost:3006/api/employee", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // Handle success, e.g., close the modal or show a success message
        props.setOpen(false);
      } else {
        // Handle errors, log or show a message to the user
        console.error("Failed to add item");
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                <input
                  type={column.type || "text"}
                  placeholder={column.field}
                  name={column.field}
                  value={formData[column.field] || ""}
                  onChange={handleChange}
                />
              </div>
            ))}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;

//previous code
/*import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add = (props: Props) => {
  // TEST THE API

  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: () => {
  //     return fetch(`http://localhost:8800/api/${props.slug}s`, {
  //       method: "post",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: 111,
  //         img: "",
  //         lastName: "Hello",
  //         firstName: "Test",
  //         email: "testme@gmail.com",
  //         phone: "123 456 789",
  //         createdAt: "01.02.2023",
  //         verified: true,
  //       }),
  //     });
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries([`all${props.slug}s`]);
  //   },
  // });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //add new item
    // mutation.mutate();
    props.setOpen(false);
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item">
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.field} />
              </div>
            ))}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
*/
