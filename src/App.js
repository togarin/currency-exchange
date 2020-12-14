import React from "react";
import { Container, CssBaseline } from "@material-ui/core";
import BasicTable from "./Components/Table";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <BasicTable />
      </Container>
    </React.Fragment>
  );
}

export default App;
