import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import type { NextPageWithLayout } from "next";
import { useGetAll, useDelete } from "features/categories/hooks";
import AdminLayout from "common/components/admin_layout";
import { Category } from "common/models/category.model";
import {
  EditOutlined,
  DeleteOutlined,
  SmallDashOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const CategoryTable: NextPageWithLayout = () => {
  const { data, error, mutate } = useGetAll();
  const {
    error: deleteError,
    isLoading: isDeleteLoading,
    deleteCategory,
  } = useDelete();

  const columns: ColumnsType<Category> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ангилалын нэр",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Үйлдэл",
      dataIndex: "id",
      className:"w-40",
      key: "id",
      render: (id) => (
        <Space size="middle">
          <Link href={`/admin/category/${id}`}>
            <a>
              <SmallDashOutlined/>
            </a>
          </Link>
          <Link href={`/admin/category/${id}/edit`}>
            <a>
              <EditOutlined/>
            </a>
          </Link>
          <DeleteOutlined
            onClick={async () => {
              await deleteCategory(id, () => {
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
        href="/admin/category/register"
      >
        + Нэмэх
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        className="overflow-x-auto py-4"
      />
    </div>
  );
};

CategoryTable.getLayout = (ptitle: any) => {
  return <AdminLayout>{ptitle}</AdminLayout>;
};

export default CategoryTable;
