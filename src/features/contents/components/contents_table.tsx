import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState, useEffect } from "react";
import type { NextPageWithLayout } from "next";
import { useGetAll } from "features/courses/hooks";
import { useDelete } from "features/contents/hooks";
import AdminLayout from "common/components/admin_layout";
import { Content } from "common/models/content.model";
import {
  EditOutlined,
  DeleteOutlined,
  SmallDashOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const ContentTable: NextPageWithLayout = () => {
  const { data, error, mutate } = useGetAll();
  const {
    error: deleteError,
    isLoading: isDeleteLoading,
    deleteContent,
  } = useDelete();

  const [contentData, setContentData] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      let dat = contentData;
      data.map((item) => {
        if (item.contents.length !== 0) dat = [...dat, ...item.contents];
      });
      setContentData(dat);
    }
  }, [data]);

  const columns: ColumnsType<Content> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Контентийн нэр",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Үйлдэл",
      dataIndex: "id",
      className:"w-40",
      key: "id",
      render: (id: string) => (
        <Space size="middle">
          <Link href={`/admin/contents/${id}`}>
            <a>
              <SmallDashOutlined/>
            </a>
          </Link>
          <Link href={`/admin/contents/${id}/edit`}>
            <a>
              <EditOutlined/>
            </a>
          </Link>
          <DeleteOutlined
            onClick={async () => {
              await deleteContent(id, () => {
                mutate && mutate();
              });
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        className="bg-blue-500"
        href="/admin/contents/register"
      >
        + Нэмэх
      </Button>
      <Table
        columns={columns}
        dataSource={contentData}
        className="overflow-x-auto py-4"
      />
    </div>
  );
};

ContentTable.getLayout = (ptitle: any) => {
  return <AdminLayout>{ptitle}</AdminLayout>;
};

export default ContentTable;
