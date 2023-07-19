import { Form, Input, Row, Col, Typography, Button, notification, Alert } from "antd"
import { useState } from "react";
import { requestResetPassword } from "../services/userService";

const { Title, Paragraph } = Typography;

const ResetPasswordRequest = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async ({ email }) => {
        setLoading(true);

        try{
            await requestResetPassword(email);
            setSent(true);
        } catch(error){
            notification.error({ message: "Error", description: "Unexpected error occured" });
        } finally {
            setLoading(false);
        }
    }

    return <Row gutter={16}>
        <Col span={24}>
            <Title>Reset Password Request</Title>
            <Paragraph>
                To reset your password, please provide your email.
            </Paragraph>
        </Col>
        <Col xs={24} sm={14} md={10} xxl={6}>
            {sent ? <Alert
                message="Success!"
                description="If we found an eligible account associated with that email, we've sent password reset instructions."
                type="success"
                showIcon
                closable
                /> : <Form
                form={form}
                onFinish={handleSubmit}>
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
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Send Reset Instructions
                    </Button>
                </Form.Item>
            </Form>}
        </Col>
    </Row>
}

export default ResetPasswordRequest;