import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Typography,
  Space,
  Checkbox,
  notification,
} from "antd";
import { appName } from "configs/default";
import Head from "next/head";
import {
  CheckCircleFilled,
  LeftCircleOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import useRegister from "./hooks";
import { useSession } from "common/recoil";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Router from "next/router";

const { Title } = Typography;

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const [privacy, setPrivacy] = useState<Boolean>(false);

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const { error, setError, isLoading, register } = useRegister();
  const { setSession } = useSession();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    register(values, async (response) => {
      notification.open({
        message: "Мэдэгдэл",
        description: "Амжилттай бүртгэгдлээ",
      });
      Router.push("/auth/login");
    });
  };

  return (
    <>
      <Head>
        <title>{`Бүртгүүлэх -【${appName}】`}</title>
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
          <div className="">
            <Row className="h-20">
              <Title level={4} className="text-center w-full">
                Бүртгүүлэх
              </Title>
              <p className="text-center w-full text-red-800">{error}</p>
            </Row>
            <Row className="grid place-items-center">
              <Form
                form={form}
                name="normal_login"
                onFinish={onFinish}
                className="w-2/3"
              >
                <Form.Item
                  name="firstname"
                  rules={[{ required: true, message: "Нэрээ оруулна уу!" }]}
                >
                  <Input
                    type="string"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Хэрэглэгчийн овог"
                    onChange={() => setError(null)}
                  />
                </Form.Item>
                <Form.Item
                  name="lastname"
                  rules={[{ required: true, message: "Нэрээ оруулна уу!" }]}
                >
                  <Input
                    type="string"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Хэрэглэгчийн нэр"
                    onChange={() => setError(null)}
                  />
                </Form.Item>
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
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Нууц үгээ оруулна уу!" }]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Нууц үг"
                    onChange={() => setError(null)}
                  />
                </Form.Item>

                <Form.Item
                  name="repassword"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Нууц үгээ давтан оруулна уу!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Таны оруулсан 2 нууц үг тохирохгүй байна!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Нууц үг баталгаажуулах"
                    onChange={() => setError(null)}
                  />
                </Form.Item>
                <p className="break-all text-sm text-gray-500">
                  Та хувийн мэдээлэлээ дээрх зорилгоор өгч хамтран ажиллахыг
                  зөвшөөрч байна уу?
                </p>
                <Form.Item rules={[{ required: true, message: "Заавал" }]}>
                  <Checkbox
                    onClick={() => {
                      if (privacy === true) {
                        setPrivacy(false);
                      } else setPrivacy(true);
                    }}
                  >
                    Зөвшөөрч Байна
                  </Checkbox>
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
                          .filter(({ errors }) => errors.length).length ||
                        privacy === false
                      }
                      className="w-full"
                      loading={isLoading}
                    >
                      Бүртгүүлэх
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
            <Button type="text" href="/auth/reset-email">
              НУУЦ ҮГ СЭРГЭЭХ
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Register;
