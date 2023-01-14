import { Button, Form, Input, InputNumber, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import type { NextPageWithLayout } from "next";
import { useGet } from "features/categories/hooks";
import { useRouter } from "next/router";
import AdminLayout from "common/components/admin_layout";

const CategoryDetailForm: NextPageWithLayout = () => {
  const router = useRouter();
  const { wid } = router.query;
  const { data, error, mutate } = useGet(wid ? (wid as string) : "");

  if (!data) {
    return <div className="flex items-center justify-center">{`Loading`}</div>;
  }

  return (
    <Form
      name="nest-messages"
      layout="vertical"
      className="px-10"
      disabled={true}
      initialValues={{
        ["id"]: data.id,
        ["name"]: data.name,
      }}
    >
      <Form.Item name={["id"]} label="ID">
        <Input />
      </Form.Item>
      <Form.Item name={["name"]} label="Ангилалын нэр">
        <Input />
      </Form.Item>
      {/* <Form.Item label="Image" valuePropName="fileList">
        <Upload action="/upload.do" listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item> */}
    </Form>
  );
};

CategoryDetailForm.getLayout = (title: any) => {
  return <AdminLayout>{title}</AdminLayout>;
};
export default CategoryDetailForm;
