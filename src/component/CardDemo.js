import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import "./Card.css";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

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
              <div className="div1">
                {" "}
                <EditIcon boxSize={20} onClick={() => props.Update(props.id)} />
              </div>
              <div className="div2">
                <DeleteIcon
                  boxSize={20}
                  onClick={() => props.Delete(props.id)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
