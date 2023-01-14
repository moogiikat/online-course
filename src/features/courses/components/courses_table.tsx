import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import type { NextPageWithLayout } from "next";
import { useGetAll, useDelete } from "features/courses/hooks";
import AdminLayout from "common/components/admin_layout";
import { Course } from "common/models/course.model";
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
    deleteCourse,
  } = useDelete();

  const columns: ColumnsType<Course> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Курсын нэр",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Агуулга",
    //   dataIndex: "description",
    //   key: "description",
    // },
    {
      title: "Төрөл",
      key: "category",
      dataIndex: "category",
      render: (category) => (
        // let color = tag.length > 5 ? "geekblue" : "green";
        // if (tag === "loser") {
        //   color = "volcano";
        // }
        <>
          <Tag color={"geekblue"}>{category?.name.toUpperCase()}</Tag>
        </>
      ),
    },
    {
      title: "Үйлдэл",
      dataIndex: "id",
      className:"w-40",
      key: "id",
      render: (id) => (
        <Space size="middle">
          <Link href={`/admin/courses/${id}`}>
            <a>
              <SmallDashOutlined/>
            </a>
          </Link>
          <Link href={`/admin/courses/${id}/edit`}>
            <a>
              <EditOutlined/>
            </a>
          </Link>

          <DeleteOutlined
            onClick={async () => {
              await deleteCourse(id, () => {
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
        href="/admin/courses/register"
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
