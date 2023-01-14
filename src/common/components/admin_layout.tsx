import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlaySquareOutlined,
  BarsOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Header as AdminHeader } from "layouts/header";
import Router from "next/router";
import { Category } from "common/models/category.model";

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="h-screen">
      <AdminHeader />
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="pt-16 bg-white"
      >
        <div className="logo" />
        <Menu
          // theme="dark"
          className="bg-white"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <BarsOutlined />,
              label: "Ангилал",
              onClick: () => {
                Router.push("/admin");
              },
            },
            {
              key: "2",
              icon: <ProjectOutlined />,
              label: "Курс",
              onClick: () => {
                Router.push("/admin/courses");
              },
            },
            {
              key: "3",
              icon: <PlaySquareOutlined />,
              label: "Контент",
              onClick: () => {
                Router.push("/admin/contents");
              },
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout pt-10">
        <Header className="site-layout-background" style={{ padding: 10 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px 0px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
