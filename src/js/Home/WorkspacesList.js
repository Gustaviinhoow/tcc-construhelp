import React, { Component } from "react";
import { Container, Form, Button, Card, ListGroup } from "react-bootstrap";
import { TrashFill, ArrowRightSquareFill } from "react-bootstrap-icons";

import Header from "./Header";
import api from "../../services/api";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";

import "../../css/WorkspacesList.css";

export default class WorkspacesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateWorkspace: false,
      Workspace: {
        name: "",
        userId: this.props.id,
      },
      workspaceData: [],
      listWorkspaces: false,
    };

    this.showContent = this.showContent.bind(this);
    this.renderFormWorkspaces = this.renderFormWorkspaces.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.getWorkspaces = this.getWorkspaces.bind(this);
  }

  componentDidMount() {
    this.getWorkspaces();
  }

  showContent() {
    this.setState({
      showCreateWorkspace: !this.state.showCreateWorkspace,
    });
  }

  getWorkspaces() {
    const User = { userId: this.state.Workspace.userId };

    api
      .post(`/workspaces/list`, User)
      .then((res) => {
        const workspaces = res.data;

        this.setState({ workspaceData: workspaces });
      })
      .catch((err) => {
        console.log(err);
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
          this.setState({
            showCreateWorkspace: false,
            listWorkspaces: true,
          });

          //refresh page
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
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

  deleteWorkspace(workspaceName, id) {
    confirmAlert({
      title: "Confirmar",
      message: `Tem certeza que deseja deletar "${workspaceName}"?`,
      buttons: [
        {
          label: "Sim",
          onClick: () => {
            api
              .delete(`/workspaces/${id}`)
              .then((res) => {
                NotificationManager.success(
                  "",
                  `Sucesso ao deletar "${workspaceName}"`,
                  2000,
                  () => {}
                );

                setTimeout(() => {
                  window.location.reload(true);
                }, 2000);
              })
              .catch((err) => {
                NotificationManager.error(
                  "",
                  "Algo deu errado.",
                  2000,
                  () => {}
                );
                console.log(err);
              });
          },
        },
        {
          label: "Não",
        },
      ],
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
              <div className="ml-auto p-2">
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
            </div>
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              {this.state.workspaceData === undefined ||
              this.state.workspaceData.length === 0 ? (
                <p>Nenhum workspace encontrado.</p>
              ) : (
                this.state.workspaceData.map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    className="listItem d-flex mt-1"
                  >
                    <div className="p-2">{item.name}</div>
                    <div className="ml-auto p-2">
                      <TrashFill
                        color="red"
                        size={25}
                        className="spacing-right"
                        onClick={this.deleteWorkspace.bind(
                          this,
                          item.name,
                          item.id
                        )}
                      />
                      <Link
                        to={{
                          pathname: "/dashboard/workspace",
                          state: {
                            userId: this.state.Workspace.userId,
                            workspaceId: item.id,
                          },
                        }}
                      >
                        <ArrowRightSquareFill
                          color="black"
                          size={30}
                          className="mr-sm-2"
                        />
                      </Link>
                    </div>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Card.Body>
        </Card>
        <NotificationContainer />
      </Container>
    );
  }
}
