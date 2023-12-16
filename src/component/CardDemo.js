import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import "./Card.css";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CreateIcon from "@mui/icons-material/Create";
import { Delete } from "@material-ui/icons";

export default function CardDemo(props) {
  return (
    <div class="notifications-container" key={props.id}>
      <div class="error-alert">
        <div class="flex">
          <div class="flex-shrink-0"></div>
          <div class="error-prompt-container">
            <p class="error-prompt-heading">{props.title}</p>
            <div class="error-prompt-wrap">
              <ul class="error-prompt-list" role="list">
                <p>{props.descrip}</p>
              </ul>
            </div>
            <div className="imp_button">
              {" "}
              <Tooltip title="Edit">
                <IconButton>
                  <CreateIcon onClick={() => props.Update(props.id)} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton>
                  <DeleteIcon onClick={() => props.Delete(props.id)} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
