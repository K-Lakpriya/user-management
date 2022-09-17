import React, { useEffect } from "react";
import { Button, Card, Form, Input } from "antd";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { loginAsync, userLogin } from "./loginSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.login);
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (session) navigate("/");
  }, [authState.isLoggedIn]);
  const onFinish = (values) => {
    dispatch(loginAsync(values));
  };

  return (
    <div className="login-container">
      <Card
        hoverable
        style={{
          width: 480,
          height: "auto",
        }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            email: "lakpriya@gmail.com",
            password: "123456",
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={authState.loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
