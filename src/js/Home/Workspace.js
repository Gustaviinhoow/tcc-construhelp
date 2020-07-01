import React, { Component } from "react";
import { Container, Form, Button, Card, ListGroup } from "react-bootstrap";

import Header from "./Header";
import api from "../../services/api";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { confirmAlert } from "react-confirm-alert";

import "../../css/Workspace.css";

export default class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateTask: false,
      Task: {
        title: "",
        description: "",
        priority: "Normal",
        deadline: null,
        workspaceId: this.props.workspaceId,
      },
      taskData: [],
      listTasks: false,
      changeListing: false,
    };

    this.showContent = this.showContent.bind(this);
    this.changeListing = this.changeListing.bind(this);
    this.renderFormTasks = this.renderFormTasks.bind(this);
    this.renderTaskCompleted = this.renderTaskCompleted.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.changeTask = this.changeTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.getTasks = this.getTasks.bind(this);
  }

  componentDidMount() {
    this.getTasks();
  }

  showContent() {
    this.setState({
      showCreateTask: !this.state.showCreateTask,
    });
  }

  changeListing() {
    this.setState({
      changeListing: !this.state.changeListing,
    });
  }

  getTasks() {
    const Task = { workspaceId: this.state.Task.workspaceId };
    api
      .post(`/tasks/listCompleted`, Task)
      .then((res) => {
        const task = res.data;

        this.setState({ taskDataCompleted: task });
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .post(`/tasks/list`, Task)
      .then((res) => {
        const task = res.data;

        this.setState({ taskData: task });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderFormTasks() {
    return (
      <div>
        <Card>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Título</Form.Label>
                <Form.Control onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Descrição</Form.Label>
                <Form.Control onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="priority">
                <Form.Label>Prioridade</Form.Label>
                <Form.Control as="select" onChange={this.handleChange}>
                  <option>Normal</option>
                  <option>Alta</option>
                  <option>Baixa</option>
                  <option>Urgente</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="deadline">
                <Form.Label>Data limite</Form.Label>
                <Form.Control
                  type="date"
                  onChange={this.handleChange}
                  style={{ width: "100%" }}
                />
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

  renderTaskCompleted() {
    return (
      <div className="row">
        {this.state.taskDataCompleted === undefined ||
        this.state.taskDataCompleted.length === 0 ? (
          <p>Tudo limpo.</p>
        ) : (
          this.state.taskDataCompleted.map((item) => {
            const itemData = item.deadline;
            let deadline = "";

            if (itemData === undefined || itemData === null) {
              deadline = "Indefinido";
            } else {
              deadline = `${itemData.substring(8, 10)}/${itemData.substring(
                5,
                7
              )}/${itemData.substring(0, 4)}`;
            }

            return (
              <div className="col-md-4 spacing-top">
                <Card key={item.id} style={{ width: "18rem" }} className="mb-2">
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text className="description-text">
                      {item.description}
                    </Card.Text>
                    <br />
                    <Card.Text>Prioridade: {item.priority}</Card.Text>
                  </Card.Body>
                  <Card.Footer>Data limite: {deadline}</Card.Footer>
                </Card>
              </div>
            );
          })
        )}
      </div>
    );
  }

  handleChange(event) {
    this.setState({
      Task: {
        ...this.state.Task,
        [event.target.id]: event.target.value,
      },
    });

    console.log(this.state.Task);
  }

  handleSubmit(event) {
    event.preventDefault();

    api
      .post("tasks/", this.state.Task)
      .then((res) => {
        if (res.status === 200) {
          NotificationManager.success("", "Criado com sucesso", 2000, () => {});
          this.setState({
            showCreateTask: false,
            listTasks: true,
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

  deleteTask(taskName, id) {
    confirmAlert({
      title: "Confirmar",
      message: `Tem certeza que deseja deletar "${taskName}"?`,
      buttons: [
        {
          label: "Sim",
          onClick: () => {
            api
              .delete(`/tasks/${id}`)
              .then((res) => {
                NotificationManager.success(
                  "",
                  `Sucesso ao deletar "${taskName}"`,
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

  changeTask(taskName, id) {
    const taskModel = {
      id: id,
    };

    confirmAlert({
      title: "Confirmar",
      message: `Marcar "${taskName}" como concluído?`,
      buttons: [
        {
          label: "Sim",
          onClick: () => {
            api
              .post("/tasks/markascompleted", taskModel)
              .then((res) => {
                NotificationManager.success(
                  "Marcado como concluído.",
                  "",
                  2000,
                  () => {}
                );

                setTimeout(() => {
                  window.location.reload(true);
                }, 2000);
              })
              .catch((err) => {
                NotificationManager.error(
                  "Ocorreu um erro.",
                  "",
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
        <Header id={this.props.userId} />
        {this.state.showCreateTask ? this.renderFormTasks() : null}
        <Card style={{ width: "100%" }}>
          <Card.Header>
            <div className="d-flex mt-1">
              <Card.Title className="p-2">Serviços e Tarefas</Card.Title>
              <div className="ml-auto p-2">
                {this.state.showCreateTask ? (
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
            {this.state.changeListing ? (
              <p onClick={this.changeListing.bind(this)} className="show-tasks">
                Ocultar tarefas concluídas
              </p>
            ) : (
              <p onClick={this.changeListing.bind(this)} className="show-tasks">
                Mostrar tarefas concluídas
              </p>
            )}
          </Card.Header>
          <Card.Body>
            {this.state.changeListing ? this.renderTaskCompleted() : null}
            <br />
            <Card.Title>Tarefas ativas</Card.Title>
            <div className="row">
              {this.state.taskData === undefined ||
              this.state.taskData.length === 0 ? (
                <p>Tudo limpo.</p>
              ) : (
                this.state.taskData.map((item) => {
                  const itemData = item.deadline;
                  let deadline = "";

                  if (itemData === undefined || itemData === null) {
                    deadline = "Indefinido";
                  } else {
                    deadline = `${itemData.substring(
                      8,
                      10
                    )}/${itemData.substring(5, 7)}/${itemData.substring(0, 4)}`;
                  }

                  return (
                    <div className="col-md-4 spacing-top">
                      <Card
                        key={item.id}
                        style={{ width: "18rem" }}
                        className="mb-2"
                      >
                        <Card.Body>
                          <Card.Title>{item.title}</Card.Title>
                          <Card.Text className="description-text">
                            {item.description}
                          </Card.Text>
                          <br />
                          <Card.Text>Prioridade: {item.priority}</Card.Text>
                          <Button
                            className="spacing-right"
                            variant="danger"
                            size="sm"
                            onClick={this.deleteTask.bind(
                              this,
                              item.title,
                              item.id
                            )}
                          >
                            Excluir
                          </Button>
                          <Button
                            variant="success"
                            size="sm"
                            onClick={this.changeTask.bind(
                              this,
                              item.title,
                              item.id
                            )}
                          >
                            Concluído
                          </Button>
                        </Card.Body>
                        <Card.Footer>Data limite: {deadline}</Card.Footer>
                      </Card>
                    </div>
                  );
                })
              )}
            </div>
          </Card.Body>
        </Card>
        <br />
        <NotificationContainer />
      </Container>
    );
  }
}
