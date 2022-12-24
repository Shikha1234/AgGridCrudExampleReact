import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@material-ui/core";

export default function FormDialog({ open, handleClose , data, onChange, handleFormSubmit}) {
  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };


  const {id , name, email, phone , dob} = data 
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {id ? "Update User" : "Create New User"}
        </DialogTitle>
        <DialogContent>
            <form>
                <TextField id="name" value = {name} onChange= {e => onChange(e)} placeholder="Enter Name" label="Name"  variant="outlined" margin="dense" fullWidth></TextField>
                <TextField id="email"  value ={email} onChange= {e => onChange(e)} placeholder="Enter Email" label="Email"  variant="outlined" margin="dense" fullWidth></TextField>
                <TextField id="phone" value ={phone} onChange= {e => onChange(e)} placeholder="Enter phone" label="Phone"  variant="outlined" margin="dense"fullWidth></TextField>
                <TextField id="dob" value ={dob} onChange= {e => onChange(e)}  placeholder="Enter Date of birth" label="Dob"  variant="outlined" margin="dense" fullWidth></TextField>
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleFormSubmit()} variant="contained">
            {id ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
