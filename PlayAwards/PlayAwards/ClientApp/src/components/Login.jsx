import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import { login } from '../services/userService';
import UserContext from './context/UserContext';

const LoginForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);

    try {
        const { data } = await login(email, password);
        userContext.setUserToken(data.token);
        form.resetFields();
        window.location = "/register";
    } catch(error) {
        if(error.response && error.response.status === 401)
          notification.warning({ message: "Login", description: "Invalid login credentials" })
    } finally {
        setLoading(false);
    }
  };

  return <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      style={{ maxWidth: '400px', margin: '0 auto' }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please enter your email!' },
          { type: "email", message: 'Type a valid email!' }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Link to="/reset-password-request">Forgot Password?</Link>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Login
        </Button>
      </Form.Item>
    </Form>;
};

export default LoginForm;
