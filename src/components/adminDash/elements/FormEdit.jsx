import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [uName, setuName] = React.useState(props.employee.username);
  const [pin, setPin] = React.useState(props.employee.password);
  //   console.log(props.employees);
  //   console.log(props.employee);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUsernameChange = (e) => {
    setuName(e.target.value);
  };

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const handleEdit = () => {
    axios
      .put("http://localhost:8080/admin/editUser/" + props.employee.id, {
        username: uName,
        password: pin,
      })
      .then((result) => {
        console.log(result);

        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.employee.username}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit your employee's name and or pin number.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            type="username"
            fullWidth
            variant="standard"
            value={uName}
            onChange={handleUsernameChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="pin number"
            type="password"
            fullWidth
            variant="standard"
            inputProps={{ maxLength: 4 }}
            value={pin}
            onChange={handlePinChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEdit}>Change</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
