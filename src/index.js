import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, injectGlobal } from "styled-components";

import Theme, { globalStyles } from "./theme";
import Home from './modules/home';

injectGlobal`${globalStyles}`;

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <Home/>
  </ThemeProvider>,
  document.getElementById("root")
);
