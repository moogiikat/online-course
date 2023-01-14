import { Button, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AuthRepository } from "common/services";
import React from "react";
import type { NextPageWithLayout } from "next";
import ProfileLayout from "common/components/profile_layout";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
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
/* eslint-enable no-template-curly-in-string */

const PasswordUpdateForm: NextPageWithLayout = () => {
  const router = useRouter();
  const onFinish = async (values: any) => {
    const response = await AuthRepository.getInstance().getAccessToken(true);
    await AuthRepository.getInstance().passwordChange(values, response.access_token);
    router.push("/");
  };

  return (
    <Form
      // {...layout}
      name="nest-messages"
      layout="vertical"
      onFinish={onFinish}
      validateMessages={validateMessages}
      className="px-10"
    >
      <Form.Item
        name="oldPassword"
        label="Одоогийн Нууц үг"
        rules={[{ required: true, message: "Одоогийн Нууц үгээ оруулна уу!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Одоогийн Нууц үг"
          onChange={() => {}}
        />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="Шинэ Нууц үг"
        rules={[{ required: true, message: "Шинэ Нууц үгээ оруулна уу!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Шинэ Нууц үг"
          onChange={() => {}}
        />
      </Form.Item>

      <Form.Item
        name="rePassword"
        label="Шинэ Нууц үг баталгаажуулах"
        dependencies={["rePassword"]}
        rules={[
          { required: true, message: "Шинэ Нууц үгээ давтан оруулна уу!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("rePassword") === value) {
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
          placeholder="Шинэ Нууц үг баталгаажуулах"
          onChange={() => {}}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
        <Button type="primary" htmlType="submit" className="bg-blue-500">
          Илгээх
        </Button>
      </Form.Item>
    </Form>
  );
};

PasswordUpdateForm.getLayout = (title: any) => {
  return <ProfileLayout>{title}</ProfileLayout>;
};
export default PasswordUpdateForm;
