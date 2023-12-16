import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import "../App.css";
import Newtask from "./Newtask";
import Typography from "@mui/material/Typography";
import CardDemo from "./CardDemo";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";

const label = { inputProps: { "aria-label": "Switch demo" } };

const defaultTheme = createTheme();

export default function NewHome() {
  const [title, setTitle] = useState("");
  const [description, setDescrip] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [User, setUser] = useState({});
  const [Task, setTask] = useState([]);
  const [IsUpdate, setUpdate] = useState(false);
  const [isDateTimePickerEnabled, setIsDateTimePickerEnabled] = useState(false);
  const [Updatetask, setUpdatetask] = useState("");
  const [Loader, setLoader] = useState(true);
  const toggleDateTimePicker = (props) => {
    setIsDateTimePickerEnabled(!isDateTimePickerEnabled);
  };

  const UserAccess = async () => {
    try {
      setLoader(true);
      console.log("Token => ", localStorage.getItem("token"));
      const response = await fetch(`${process.env.REACT_APP_SERVER}/access`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      console.log(data.access_token, "  ", response.status);
      if (response.status == 200) {
        localStorage.setItem("AccessToken", data.access_token);
        UserProfile(data.access_token);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const UserProfile = async (AccessToken) => {
    try {
      console.log("Token => ", localStorage.getItem("token"));
      const response = await fetch(`${process.env.REACT_APP_SERVER}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: AccessToken,
        },
      });
      const data = await response.json();
      console.log(data, "  ", response.status);
      if (response.status == 200) {
        setUser(data);
        localStorage.setItem("UserID", data.userId);
        TasksList(data.userId);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const TasksList = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/tasks/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data, "  ", response.status);
      if (response.status == 200) {
        setTask(data);
        setLoader(false);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const Delete = async (id) => {
    try {
      console.log(id);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/removetask/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data, "  ", response.status);
      if (response.status == 200) {
        window.location.reload(true);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateTask = async () => {
    try {
      var dateToSend;
      console.log(
        "UserID : ",
        localStorage.getItem("UserID"),
        " ; taskID",
        Updatetask
      );

      if (isDateTimePickerEnabled) {
        dateToSend = standardFormat(selectedDate);
      } else {
        dateToSend = null;
      }
      const response = await fetch(
        `${
          process.env.REACT_APP_SERVER
        }/updatetask/${Updatetask}/${localStorage.getItem("UserID")}`,
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
        console.log(data);
      }
    } catch (err) {
      console.log(err);
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      UserAccess(localStorage.getItem("token"));
    } else {
      window.location.href = "/";
    }
  }, []);
  const update = (id) => {
    setUpdate(true);
    setUpdatetask(id);
  };
  const Logout = () => {
    localStorage.removeItem("UserID");
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Task
          </Typography>

          <Newtask />

          <Button variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={Logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {Loader ? (
        <Container
          disableGutters
          maxWidth="sm"
          component="main"
          sx={{ pt: 8, pb: 6, mt: 12 }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            <CircularProgress />
          </Typography>
        </Container>
      ) : (
        <Container maxWidth="md" component="footer">
          {" "}
          <Typography
            typography={"hjh"}
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              mt: 8,
            }}
          >
            Hello, {User.name}
          </Typography>
          {IsUpdate ? (
            <form className="update_form">
              <h3>Update Task</h3>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                sx={{ width: 455 }}
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
                <Button onClick={() => setUpdate(false)}>Cancel</Button>
                <Button onClick={UpdateTask}>Submit</Button>
              </Typography>
            </form>
          ) : (
            <div className="items">
              {Task.map((d, index) => (
                <CardDemo
                  id={d._id}
                  title={d.title}
                  descrip={d.description}
                  Delete={() => Delete(d._id)}
                  cardid={d._id}
                  selectcardid={d._id}
                  Update={() => update(d._id)}
                />
              ))}
            </div>
          )}
        </Container>
      )}
      {/* End footer */}
    </ThemeProvider>
  );
}
