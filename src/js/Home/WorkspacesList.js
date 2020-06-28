import React, { Component } from "react";
import {
  Container,
  Form,
  FormControl,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";

import Header from "./Header";
import api from "../../services/api";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

export default class WorkspacesList extends Component {
  constructor() {
    super();
    this.state = {
      showCreateWorkspace: false,
      Workspace: {
        name: "",
        UserId: undefined,
      },
      workspaceData: undefined,
    };

    this.showContent = this.showContent.bind(this);
    this.renderFormWorkspaces = this.renderFormWorkspaces.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  showContent() {
    this.setState({
      showCreateWorkspace: !this.state.showCreateWorkspace,
    });
  }

  renderFormWorkspaces() {
    return (
      <div>
        <Card>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Nome do Workspace</Form.Label>
                <Form.Control onChange={this.handleChange} />
              </Form.Group>
              <Button variant="success" size="sm" type="submit">
                Criar
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }

  handleChange(event) {
    this.setState({
      Workspace: {
        name: event.target.value,
        userId: this.props.id,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    api
      .post("workspaces/", this.state.Workspace)
      .then((res) => {
        if (res.status === 200) {
          NotificationManager.success("", "Criado com sucesso", 2000, () => {});
          // ação dps do cadastro
          this.setState({
            showCreateWorkspace: false,
          });
        } else {
          NotificationManager.error(
            "Verifique se os dados são válidos.",
            "Falha na criação",
            2000,
            () => {}
          );
        }
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(
          "Ocorreu um erro interno.",
          "Falha na criação",
          2000,
          () => {}
        );
      });
  }

  render() {
    return (
      <Container className="">
        <Header id={this.props.id} />
        {this.state.showCreateWorkspace ? this.renderFormWorkspaces() : null}
        <Card style={{ width: "100%" }}>
          <Card.Header>
            <div className="d-flex mt-1">
              <Card.Title className="p-2">Workspaces</Card.Title>
              <div className="p-2">
                {this.state.showCreateWorkspace ? (
                  <Button
                    variant="danger"
                    size="md"
                    className=""
                    onClick={() => this.showContent()}
                  >
                    Close
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    size="md"
                    className=""
                    onClick={() => this.showContent()}
                  >
                    Add
                  </Button>
                )}
              </div>
              <Form inline className="ml-auto p-2">
                <FormControl type="text" placeholder="Pesquisar" />
              </Form>
            </div>
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>Workspace 1</ListGroup.Item>
              <ListGroup.Item>Workspace 2</ListGroup.Item>
              <ListGroup.Item>Workspace 3</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
        <NotificationContainer />
      </Container>
    );
  }
}
