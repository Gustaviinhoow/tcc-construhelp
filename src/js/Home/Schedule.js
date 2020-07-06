import React, { useState, useEffect } from "react";

import Header from "./Header";
import { Container, Card } from "react-bootstrap";
import api from "../../services/api";

export default function Schedule(props) {
  const [dataTaskUrgente, setTaskUrgente] = useState([]);
  const [dataTaskAlta, setTaskAlta] = useState([]);
  const [dataTaskNormal, setTaskNormal] = useState([]);
  const [dataTaskBaixa, setTaskBaixa] = useState([]);

  useEffect(() => {
    getTasks("Urgente");
    getTasks("Alta");
    getTasks("Normal");
    getTasks("Baixa");
  }, []);

  function getTasks(priority) {
    const Task = { priority: priority, id: props.id };

    api
      .post(`/tasks/tasksPriority/`, Task)
      .then((res) => {
        const task = res.data;
        console.log(task);

        switch (priority) {
          case "Urgente":
            setTaskUrgente(task);
            break;
          case "Alta":
            setTaskAlta(task);
            break;
          case "Normal":
            setTaskNormal(task);
            break;
          case "Baixa":
            setTaskBaixa(task);
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function listData(priority) {}

  return (
    <div>
      <Header id={props.id} />
      <Container>
        <h3>Suas tarefas</h3>
        <br />
        <br />
        <h5>Prioridade: Urgente</h5>
        <div className="row">
          {dataTaskUrgente === undefined || dataTaskUrgente.length === 0 ? (
            <p style={{ marginLeft: 15 }}>Tudo limpo.</p>
          ) : (
            dataTaskUrgente.map((item) => {
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
                  <Card
                    border="danger"
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
                    </Card.Body>
                    <Card.Footer>Data limite: {deadline}</Card.Footer>
                  </Card>
                </div>
              );
            })
          )}
        </div>

        <br />
        <h5>Prioridade: Alta</h5>
        <div className="row">
          {dataTaskAlta === undefined || dataTaskAlta.length === 0 ? (
            <p style={{ marginLeft: 15 }}>Tudo limpo.</p>
          ) : (
            dataTaskAlta.map((item) => {
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
                  <Card
                    border="warning"
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
                    </Card.Body>
                    <Card.Footer>Data limite: {deadline}</Card.Footer>
                  </Card>
                </div>
              );
            })
          )}
        </div>
        <br />
        <h5>Prioridade: Normal</h5>
        <div className="row">
          {dataTaskNormal === undefined || dataTaskNormal.length === 0 ? (
            <p style={{ marginLeft: 15 }}>Tudo limpo.</p>
          ) : (
            dataTaskNormal.map((item) => {
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
                    </Card.Body>
                    <Card.Footer>Data limite: {deadline}</Card.Footer>
                  </Card>
                </div>
              );
            })
          )}
        </div>
        <br />
        <br />
        <h5>Prioridade: Baixa</h5>
        <div className="row">
          {dataTaskBaixa === undefined || dataTaskBaixa.length === 0 ? (
            <p style={{ marginLeft: 15 }}>Tudo limpo.</p>
          ) : (
            dataTaskBaixa.map((item) => {
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
                    </Card.Body>
                    <Card.Footer>Data limite: {deadline}</Card.Footer>
                  </Card>
                </div>
              );
            })
          )}
        </div>
        <br />
      </Container>
    </div>
  );
}
