import { Button, Form, Input, InputNumber, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import type { NextPageWithLayout } from "next";
import ProfileLayout from "common/components/profile_layout";
import { useSession } from "common/recoil";
import { useGet } from "features/profile/hooks";

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

const ProfileInfoForm: NextPageWithLayout = () => {
  const { session, setSession } = useSession();
  const { data, error, mutate } = useGet();

  if (!data) {
    return <div className="flex items-center justify-center">{`Loading`}</div>;
  }

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form
      // {...layout}
      name="nest-messages"
      layout="vertical"
      onFinish={onFinish}
      disabled={true}
      validateMessages={validateMessages}
      initialValues={{
        ["email"]: data.email,
        ["firstname"]: data.firstname,
        ["lastname"]: data.lastname,
      }}
      className="px-10"
    >
      <div className="grid grid-cols-2 gap-x-4">
        <Form.Item name={["email"]} label="И-мэйл" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <Form.Item
          name={["firstname"]}
          label="Овог"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={["lastname"]} label="Нэр" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </div>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          className="bg-blue-500"
          disabled={true}
        >
          Илгээх
        </Button>
      </Form.Item>
    </Form>
  );
};

ProfileInfoForm.getLayout = (title: any) => {
  return <ProfileLayout>{title}</ProfileLayout>;
};
export default ProfileInfoForm;
