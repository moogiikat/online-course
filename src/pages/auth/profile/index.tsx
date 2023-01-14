import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Col, Row, Typography } from "antd";
import { appName } from "configs/default";
import { Header } from "layouts/header";
import Head from "next/head";
import { useEffect, useState } from "react";
const { Title } = Typography;

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values: any) => {};

  return (
    <>
      <Head>
        <title>{`Хувийн мэдээлэл -【${appName}】`}</title>
      </Head>
      <Header />

      <Row justify="center" className="pt-24">
        <Col md={16}>
          <Title level={5}>Хувийн мэдээлэл</Title>

          <Form
            form={form}
            name="normal_login"
            onFinish={onFinish}
            className="w-2/3"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Имэйл хаягаа оруулна уу!" },
                { type: "email", message: "Имэйл хаяг оруулна уу!" },
              ]}
            >
              <Input
                type="email"
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Имэйл"
                // onChange={() => setError(null)}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Нууц үгээ оруулна уу!" }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Нууц үг"
                // onChange={() => setError(null)}
              />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="dashed"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    !!form
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length
                  }
                  className="w-full"
                  // loading={isLoading}
                >
                  Нэвтрэх
                </Button>
              )}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
