import { Button, Form, Input, InputNumber, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import type { NextPageWithLayout } from "next";
import { useGet, useEditContent } from "features/contents/hooks";
import { useRouter } from "next/router";
import AdminLayout from "common/components/admin_layout";

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

const contentEditForm: NextPageWithLayout = () => {
  const router = useRouter();
  const { error: editError, isLoading, EditContent } = useEditContent();
  const { wid } = router.query;
  const { data, error, mutate } = useGet(wid ? (wid as string) : "");
  const onFinish = async (values: any) => {
    await EditContent(wid ? (wid as string) : "", values, () => {
      router.push("/admin/contents");
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
      initialValues={{
        ["course_id"]: wid,
        ["name"]: data?.name,
        ["path"]: data?.imagePath,
      }}
    >
      <Form.Item
        name={["name"]}
        label="Контентын нэр"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["course_id"]}
        label="Курсын ID"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name={["path"]} label="Бичлэгийн холбоос" rules={[{ required: true }]}>
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

contentEditForm.getLayout = (title: any) => {
  return <AdminLayout>{title}</AdminLayout>;
};
export default contentEditForm;
