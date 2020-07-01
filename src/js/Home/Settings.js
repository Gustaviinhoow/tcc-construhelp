import React, { useState } from "react";

import { Container, Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { confirmAlert } from "react-confirm-alert";

import Header from "./Header";

export default function Settings(props) {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const history = useHistory();

  function renderChangePassword() {
    return (
      <div>
        <br />
        <Card>
          <Card.Body>
            <Form>
              <Form.Group controlId="currentPassword">
                <Form.Label>Senha atual</Form.Label>
                <Form.Control type="password" onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="newPassword">
                <Form.Label>Nova senha</Form.Label>
                <Form.Control type="password" onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="confirmNewPassword">
                <Form.Label>Confirmar nova senha</Form.Label>
                <Form.Control type="password" onChange={handleChange} />
              </Form.Group>
              <Button variant="success" size="sm" onClick={handleSubmit}>
                Redefinir senha
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }

  function showContent() {
    setShowChangePassword(!showChangePassword);
  }

  function handleChange(event) {
    setPassword({
      ...password,
      [event.target.id]: event.target.value,
    });
  }

  function handleSubmit() {
    if (
      password.currentPassword === "" ||
      password.newPassword === "" ||
      password.confirmNewPassword === "" ||
      password.newPassword !== password.confirmNewPassword ||
      password.currentPassword.length < 8 ||
      password.newPassword.length < 8 ||
      password.confirmNewPassword.length < 8
    ) {
      NotificationManager.error("Falha: dados inválidos.", "", 2000, () => {});
      return;
    }

    const userModel = {
      id: props.id,
      password: password.newPassword,
      currentPassword: password.currentPassword,
    };

    api
      .post("/users/changepassword", userModel)
      .then((res) => {
        NotificationManager.success(
          "Senha atualizada com sucesso.",
          "",
          2000,
          () => {}
        );

        setTimeout(() => {
          history.push("/signin");
        }, 2000);
      })
      .catch((err) => {
        NotificationManager.error(
          "Falha ao atualizar senha.",
          "",
          2000,
          () => {}
        );

        console.log(err);
      });
  }

  function deleteUser() {
    confirmAlert({
      title: "Confirmar",
      message: `Tem certeza que deseja deletar sua conta?`,
      buttons: [
        {
          label: "Sim",
          onClick: () => {
            api
              .delete(`/users/${props.id}`)
              .then((res) => {
                NotificationManager.success(
                  "",
                  `Conta deletada com sucesso.`,
                  2000,
                  () => {}
                );

                setTimeout(() => {
                  history.push("/signin");
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

  return (
    <div>
      <Header id={props.id} />
      <Container>
        <h4>Configurações</h4>
        <br />

        {showChangePassword ? (
          <Button variant="warning" size="md" onClick={showContent}>
            Fechar
          </Button>
        ) : (
          <Button variant="warning" size="md" onClick={showContent}>
            Mudar senha
          </Button>
        )}
        {showChangePassword ? renderChangePassword() : null}

        <br />
        <br />
        <Button variant="danger" size="md" className="" onClick={deleteUser}>
          Deletar conta
        </Button>
        <NotificationContainer />
      </Container>
    </div>
  );
}
