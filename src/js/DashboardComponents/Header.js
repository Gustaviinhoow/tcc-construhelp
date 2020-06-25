import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { GearFill, BoxArrowRight } from "react-bootstrap-icons";

import "../../css/Header.css";

export default function Header(props) {
  return (
    <div className="spacing">
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard/workspaces"> Workspaces</Nav.Link>
            <Nav.Link href="/dashboard/schedule">Cronograma</Nav.Link>
          </Nav>
          <hr />
          <Nav>
            <Nav.Link href="/dashboard/settings">
              <GearFill color="white" size={20} /> Configurações
            </Nav.Link>
            <Nav.Link href="#">
              <BoxArrowRight color="red" size={20} /> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
