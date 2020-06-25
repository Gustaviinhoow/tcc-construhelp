import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { GearFill, BoxArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import "../../css/Header.css";

export default function Header(props) {
  return (
    <div className="spacing">
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link
                className="linkHeader"
                to={{
                  pathname: "/dashboard/workspaces",
                  state: { id: props.id },
                }}
              >
                Workspaces
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                className="linkHeader"
                to={{
                  pathname: "/dashboard/schedule",
                  state: { id: props.id },
                }}
              >
                Cronograma
              </Link>
            </Nav.Link>
          </Nav>
          <hr />
          <Nav>
            <Nav.Link>
              <Link
                className="linkHeader"
                to={{
                  pathname: "/dashboard/settings",
                  state: { id: props.id },
                }}
              >
                <GearFill color="white" size={20} /> Configurações
              </Link>
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
