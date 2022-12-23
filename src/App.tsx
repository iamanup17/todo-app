import { Button } from "antd";
import React from "react";
import {} from "react-router";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Home from "./pages/home";
import { GlobalStyles } from "./styles/GlobalStyles";
import { Theme } from "./styles/Theme";
import styled from "styled-components";
import New from "./pages/new";
import Navbar from "./components/Navbar/Navbar";

const Wrapper = styled.div`
  display:flex;
  /* width:90vw; */
  
`

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />

      <Router>
        <Wrapper>
          <Navbar />
          <div className="right">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
          </Routes>
            <div className="footer">Hello</div>

          </div>
        </Wrapper>
      </Router>
    </ThemeProvider>
  );
};

export default App;
