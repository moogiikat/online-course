import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Typography,
  message,
  notification,
} from "antd";
import { appName } from "configs/default";
import Head from "next/head";
import { LeftCircleOutlined, MailOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import useResetPassword from "./hooks";
const { Title } = Typography;

const ResetEmail: React.FC = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const { error, setError, isLoading, resetPassword } = useResetPassword();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    resetPassword(values.email, async (response) => {
      // TODO: show toast
      notification.open({
        message: "Мэдэгдэл",
        description: "Амжилттай илгээлээ. Имэйл хаягаа шалгана уу!",
      });
      // message.success("Амжилттай илгээлээ. Имэйл хаягаа шалгана уу!");
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Head>
        <title>{`Нууц үг сэргээх -【${appName}】`}</title>
      </Head>

      <Row className="h-screen">
        <Col
          xl={{ span: 17, push: 7 }}
          xs={0}
          span={17}
          push={7}
          className="bg-slate-500"
        >
          <Image
            src="/assets/login.jpeg"
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
            layout="fill"
            objectFit="cover"
          />
        </Col>
        <Col
          xl={{ span: 7, pull: 17 }}
          xs={{ span: 24, pull: 0 }}
          span={7}
          pull={17}
        >
          <div className="h-56">
            <div className="pl-16 pt-16">
              <Button
                type="text"
                icon={<LeftCircleOutlined className="text-lg" />}
                href="/"
              >
                НҮҮР ХУУДАС
              </Button>
            </div>
          </div>
          <div className="h-96">
            <Row className="h-20">
              <Title level={4} className="text-center w-full">
                Нууц үг сэргээх
              </Title>
              <p className="text-center w-full text-red-800">{error}</p>
            </Row>
            <Row className="grid place-items-center">
              <Form
                form={form}
                name="normal_reset_password"
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
                    onChange={() => setError(null)}
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
                      loading={isLoading}
                    >
                      СЭРГЭЭХ
                    </Button>
                  )}
                </Form.Item>
              </Form>
            </Row>
          </div>
          <div className="grid grid-cols-2 place-items-stretch bottom-0">
            <Button type="text" href="/auth/login">
              НЭВТРЭХ
            </Button>
            <Button type="text" href="/auth/register">
              БҮРТГҮҮЛЭХ
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ResetEmail;
