import { useState } from "react";
import { Form, Row, Col, Button, Typography, notification, Input } from "antd"
import { createUser } from "../services/userService";
import PasswordCriteriaAlert from "../components/PasswordCriteriaAlert"

const { Title } = Typography;

const Register = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);

        // Removes all special characters. Only numbers and letters
        values.fullName = values.fullName.replace(/[^a-zA-Z0-9]/g, '');

        try {
            await createUser(values);
            form.resetFields();
            notification.success({ message: "Successs", description: "User was added successfully" });
        } catch(error){
            notification.error({ message: "Error", description: "Unexpected error occured" });
        } finally {
            setLoading(false);
        }
    }

    return <Row gutter={16}>
        <Col span={24}>
            <Title>Register New User</Title>
        </Col>
        <Col span={12}>
            <Form
                form={form}
                onFinish={handleSubmit}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 18 }}
                >
                <Form.Item
                    label="Full Name"
                    name="fullName" 
                    rules={[{ required: true, message: 'Please enter your full name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter your email!' },
                        { type: "email", message: 'Type a valid email!' }
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please enter your password!' },
                        { 
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$/,
                            message: "Password does not meet the criteria!" 
                        }
                    ]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[{ required: true, message: 'Please confirm password!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                            }
                            return Promise.reject('Passwords do not match!');
                        }
                    }),
                    ]}
                >
                <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Register
                </Button>
                </Form.Item>
            </Form>
        </Col>
        <Col span={12}>
            <PasswordCriteriaAlert />
        </Col>
    </Row>
}

export default Register;