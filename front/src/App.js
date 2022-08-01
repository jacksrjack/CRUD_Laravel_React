import logo from './logo.svg';
import './App.css';

import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import EditSupport from "./components/support/edit.component";
import SupportList from "./components/support/list.component";
import CreateSupport from "./components/support/create.component";

function App() {
  return (<Router>
    <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          Gerenciamento de Suporte
        </Link>
      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/support/create" element={<CreateSupport />} />
            <Route path="/support/edit/:id" element={<EditSupport />} />
            <Route exact path='/' element={<SupportList />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;
