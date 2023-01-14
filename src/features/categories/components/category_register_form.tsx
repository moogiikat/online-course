import { Button, Form, Input, InputNumber, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import type { NextPageWithLayout } from "next";
import AdminLayout from "common/components/admin_layout";
import { useRegister } from "../hooks";
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

const CategoryForm: NextPageWithLayout = () => {
  const router = useRouter();
  const { error, isLoading, register } = useRegister();
  const onFinish = async (values: any) => {
    await register(values, () => {
      router.push("/admin/category");
    });
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
        name={["name"]}
        label="Ангилалын нэр"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
        <Button type="primary" htmlType="submit" className="bg-blue-500">
          Илгээх
        </Button>
      </Form.Item>
    </Form>
  );
};

CategoryForm.getLayout = (title: any) => {
  return <AdminLayout>{title}</AdminLayout>;
};
export default CategoryForm;
