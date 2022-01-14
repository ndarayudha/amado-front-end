import React, { Fragment, useContext } from "react";
import { Row, Col, Form, Input, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Card from "../../UI/Card";
import classes from "./Login.module.css";
import IcAmado from "../../../asset/ic_amado.png";
import Button from "../../UI/Button";
import useHttp from "../../../hooks/use-http";
import { login } from "../../../lib/auth-api";
import AuthContext from "../../../context/auth-context";

const Login = () => {
  const { sendRequest, status, data: loginData, error } = useHttp(login);
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  if (loginData !== null) {
    const expirationTime = new Date(new Date().getTime() + 3600 * 1000);
    authCtx.login(loginData, expirationTime.toISOString());
    history.replace("/patients");
  }

  const onClose = (e) => {};

  const onFinish = (values) => {
    sendRequest(values);
  };

  return (
    <Fragment>
      <section className={classes.login}>
        <Row justify="center" align="middle" className={classes["row-full"]}>
          <Col>
            <img className={classes["ic-amado"]} src={IcAmado} alt="" />
            <h2>Login Akun</h2>
            <Card className={classes["login-card"]} fourth={true}>
              <Form
                name="normal_login"
                className="login-form"
                size="large"
                onFinish={onFinish}
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Masukan email dengan benar",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Masukan password anda",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  {error ? (
                    <Alert
                      message="Error"
                      description={error}
                      type="error"
                      closable
                      onClose={onClose}
                    />
                  ) : (
                    ""
                  )}
                </Form.Item>

                <Form.Item>
                  <Button type="submit">
                    {status === "pending" ? "Loading" : "Login"}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </section>
    </Fragment>
  );
};

export default Login;
