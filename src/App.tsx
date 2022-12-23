import { Button } from "antd";
import React from "react";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Home from "./components/Home";
import { GlobalStyles } from "./styles/GlobalStyles";
import { Theme } from "./styles/Theme";

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
          <Home/>
    </ThemeProvider>
  );
};

export default App;
