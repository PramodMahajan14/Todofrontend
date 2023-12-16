import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const label = { inputProps: { "aria-label": "Switch demo" } };
var errors;
export default function Newtask() {
  const [title, setTitle] = useState("");
  const [description, setDescrip] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateTimePickerEnabled, setIsDateTimePickerEnabled] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleDateTimePicker = (props) => {
    setIsDateTimePickerEnabled(!isDateTimePickerEnabled);
  };

  const submitdata = async (e) => {
    try {
      // console.log(Title, " ", Descrip, " ", standardFormat(selectedDate));
      var dateToSend;
      e.preventDefault();

      if (isDateTimePickerEnabled) {
        dateToSend = standardFormat(selectedDate);
      } else {
        dateToSend = null;
      }
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/newtask/${localStorage.getItem(
          "UserID"
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, dateToSend }),
        }
      );
      const data = await response.json();
      console.log(data, "  ", response.status);
      if (response.status == 200) {
        window.location.reload(true);
      } else {
        errors = data.msg;
        setErrorMessage(true);
      }
      setOpen(false);
    } catch (err) {
      errors = err;
      setErrorMessage(true);
    }
  };

  const standardFormat = (inputDateString) => {
    const inputDate = new Date(inputDateString);

    const dd = String(inputDate.getDate()).padStart(2, "0");
    const mm = String(inputDate.getMonth() + 1).padStart(2, "0");
    const yyyy = inputDate.getFullYear();
    let hh = String(inputDate.getHours()).padStart(2, "0");
    const min = String(inputDate.getMinutes()).padStart(2, "0");
    const ampm = hh >= 12 ? "PM" : "AM";

    if (hh > 12) {
      hh = String(hh - 12).padStart(2, "0");
    }

    return `${dd}-${mm}-${yyyy} ${hh}:${min} ${ampm}`;
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Add New
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Typography>
            <textarea
              placeholder="Description"
              rows="5"
              name="comment[text]"
              id="comment_text"
              cols="55"
              className="ui-autocomplete-input"
              autocomplete="off"
              role="textbox"
              aria-autocomplete="list"
              aria-haspopup="true"
              onChange={(e) => setDescrip(e.target.value)}
            />

            <div>
              {" "}
              Set Reminder
              <Switch
                {...label}
                defaultChecked
                onClick={toggleDateTimePicker}
              />
              <DatePicker
                selected={selectedDate}
                onChange={(e) => setSelectedDate(e)}
                showTimeSelect
                timeFormat="h:mm aa"
                dateFormat="ddMM/yyyy h:mm aa"
                timeIntervals={15}
                timeCaption="Time"
                disabled={!isDateTimePickerEnabled}
              />{" "}
            </div>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitdata}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={ErrorMessage}
          autoHideDuration={6000}
          onClose={() => setErrorMessage(false)}
        >
          <Alert
            onClose={() => setErrorMessage(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errors}
          </Alert>
        </Snackbar>
      </Stack>
    </React.Fragment>
  );
}
