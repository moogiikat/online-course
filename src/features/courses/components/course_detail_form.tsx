import { Button, Form, Input, InputNumber, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import type { NextPageWithLayout } from "next";
import { useGet } from "features/courses/hooks";
import { useRouter } from "next/router";
import AdminLayout from "common/components/admin_layout";

const CourseDetailForm: NextPageWithLayout = () => {
  const router = useRouter();
  const { wid } = router.query;
  const { data, error, mutate } = useGet(wid ? (wid as string) : "");

  if (!data) {
    return <div className="flex items-center justify-center">{`Loading`}</div>;
  }

  return (
    <Form
      // {...layout}
      name="nest-messages"
      layout="vertical"
      disabled={true}
      className="px-10"
      initialValues={{
        ["id"]: data.id,
        ["name"]: data.name,
      }}
    >
      <Form.Item name={["id"]} label="ID">
        <Input />
      </Form.Item>
      <Form.Item name={["name"]} label="Курсын нэр">
        <Input />
      </Form.Item>
    </Form>
  );
};

CourseDetailForm.getLayout = (title: any) => {
  return <AdminLayout>{title}</AdminLayout>;
};
export default CourseDetailForm;
