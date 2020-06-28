import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { GearFill } from "react-bootstrap-icons";
import { Link, useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import "../../css/Header.css";

export default function Header(props) {
  const history = useHistory();

  function Logout() {
    confirmAlert({
      title: "Confirmar",
      message: "Tem certeza que quer sair?",
      buttons: [
        {
          label: "Sim",
          onClick: () => history.push("/"),
        },
        {
          label: "Não",
        },
      ],
    });
  }

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
                <GearFill color="white" size={20} className="mr-sm-2" />
                Configurações
              </Link>
            </Nav.Link>
            <Nav.Link href="#">
              <Button variant="danger" size="sm" onClick={Logout}>
                Logout
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
