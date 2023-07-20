import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification, Row, Col, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { resetPassword } from "../services/userService";
import PasswordCriteriaAlert from "../components/PasswordCriteriaAlert"

const { Title } = Typography;

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);

    try{
      await resetPassword(values.email, token, values.newPassword);
      form.resetFields();
      navigate("/login");
    } catch(error){
        notification.error({ message: "Error", description: "Unexpected error occured" });
    } finally {
        setLoading(false);
    }
  };

  return <Row gutter={16}>
  <Col span={24}>
      <Title>Reset Password</Title>
  </Col>
  <Col span={12}>
    <Form
      form={form}
      onFinish={handleSubmit}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please enter your email!',
          },
          {
            type: "email",
            message: 'Type a valid email!',
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="New Password"
        name="newPassword"
        rules={[
          { required: true, message: 'Please enter your new password!' },
          { 
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$/,
            message: "Password does not meet the criteria!" 
          }
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={['newPassword']}
        rules={[{ required: true, message: 'Please confirm your new password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Passwords do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  </Col>
  <Col span={12}>
    <PasswordCriteriaAlert />
  </Col>
  </Row>
};

export default ResetPassword;