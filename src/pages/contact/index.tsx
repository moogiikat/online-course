import { Button, Form, Input, InputNumber, Upload } from "antd";
import { appName } from "configs/default";
import { Header } from "layouts/header";
import { Footer } from "layouts/footer";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";

const ContactPage: React.FC = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const onFinish = async (values: any) => {
    console.log(values);
  };
  return (
    <>
      <Head>
        <title>{`【${appName}】`}</title>
      </Head>
      <Header />
      <div className="w-full bg-gray-100 pt-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col py-10 px-5 md:flex-row xl:py-14 xl:px-8 2xl:px-14 gap-x-10">
          {/* sidebar */}
          <div className="order-2 w-full shrink-0 bg-light p-5 md:order-1 md:w-72 lg:w-96 bg-white">
            <div className="mb-8 flex w-full items-center justify-center overflow-hidden">
              <img
                src={
                  "https://static.vecteezy.com/system/resources/previews/001/263/872/original/contact-us-customer-support-concept-vector.jpg"
                }
                className="h-auto w-full"
              />
            </div>

            <div className="mb-8 flex flex-col">
              <span className="mb-3 font-semibold text-heading">
                {"Манай хаяг:"}
              </span>
              <span className="text-sm text-body">
                {
                  "Munkh's Building 94 тоот, Баянзүрх дүүрэг, 16 -р хороо, Улаанбаатар хот"
                }
              </span>
            </div>

            <div className="mb-8 flex flex-col">
              <span className="mb-3 font-semibold text-heading">
                {"Холбогдох утас:"}
              </span>
              <span className="text-sm text-body">{"+976 99459449"}</span>
            </div>
            <div className="mb-8 flex flex-col">
              <span className="mb-3 font-semibold text-heading">
                {"И-мэйл хаяг:"}
              </span>
              <span className="text-sm text-body">monkhoo1997ts@gmail.com</span>
            </div>

            <div className="mb-8 flex flex-col">
              <span className="mb-4 font-semibold text-heading">
                Сошиал холбоос:
              </span>
              <div className="flex items-center justify-start">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  className="pr-5"
                >
                  <FacebookOutlined className="h-7 w-7" />
                </a>
                <a href="https://www.instagram.com" target="_blank">
                  <InstagramOutlined className="h-7 w-7" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="order-1 mb-8 w-full bg-light p-5 md:order-2 md:mb-0 md:p-8 ltr:md:ml-7 rtl:md:mr-7 ltr:lg:ml-9 rtl:lg:mr-9 bg-white">
            <h1 className="mb-7 font-body text-xl font-bold text-heading md:text-2xl">
              {"Холбоо барих"}
            </h1>
            <Form
              // {...layout}
              name="nest-messages"
              layout="vertical"
              onFinish={onFinish}
              validateMessages={validateMessages}
              className="px-10"
            >
              <Form.Item
                name={["name"]}
                label="Нэр"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["email"]}
                label="И-мэйл хаяг"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["phoneNumber"]}
                label="Утасны дугаар"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["description"]}
                label="Та асуух зүйлийнхээ талаар дэлгэрэнгүй бичнэ үү."
                rules={[{ required: true }]}
              >
                <TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-blue-500"
                >
                  Илгээх
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
