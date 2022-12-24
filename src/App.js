import React, { useState, useEffect } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Button, Grid } from "@material-ui/core";
import FormDialog from "./components/dialog";

const initialValue = { name: "", email: "", phone: "", dob: "" };

function App() {
  const [gridApi, setGridApi] = useState(null);
  const url = "http://localhost:4000/users";
  const [tableData, setTableData] = useState(null);
  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = useState(initialValue);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => setTableData(resp));
  };

  const onChange = (e) => {
    const { value, id } = e.target;
    // console.log(value, id)

    setFormData({ ...formData, [id]: value });
  };

  const columnDefs = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "dob", headerName: "Date of Birth" },
    {
      field: "id",
      headerName: "Actions",
      cellRendererFramework: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleUpdate(params.data)}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDelete(params.value)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const onGridReady = (params) => {
    setGridApi(params);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure !! you want to delete this row ??"
    );
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((resp) => getUsers());
    }
  };

  const handleUpdate = (oldData) => {
    console.log(oldData);
    setFormData(oldData);
    handleClickOpen();
  };

  const handleFormSubmit = () => {
    if (formData.id) {
      const confirm = window.confirm("Are you sure , You want to update this row?")
      confirm && fetch(url + `/${formData.id}`, {
        method: "PUT", body: JSON.stringify(formData), headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then(resp => {
          handleClose();
          getUsers();
        })
    } else {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          handleClose();
          getUsers();
        })
    }
  };

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };

  return (
    <div className="App">
      <h1 align="center">React-App</h1>
      <h4 align="center">Crud Operations with JSON server in ag</h4>
      <Grid align="right">
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Users
        </Button>
      </Grid>

      <div className="ag-theme-alpine" style={{ height: "400px" }}>
        <AgGridReact
          onGridReady={onGridReady}
          rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>

      <FormDialog
        open={open}
        handleClose={handleClose}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default App;
