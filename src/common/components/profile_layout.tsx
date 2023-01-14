import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  SettingFilled,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { Layout, Menu } from "antd";
import { FormEvent, Fragment } from "react";
import React, { useState } from "react";
import { AuthRepository, BackendClient } from "common/services";
import { Header as AdminHeader } from "layouts/header";
import Router from "next/router";
import { LogoutIcon } from "@heroicons/react/outline";
import { useSession } from "common/recoil";

const { Header, Sider, Content } = Layout;



const ProfileLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const { session, setSession } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async (event: FormEvent) => {
  
    await AuthRepository.getInstance()
      .logout()
      .then(() => {
        BackendClient.getInstance().defaults.headers.common.Authorization = ``;
      });
  
    setSession({
      status: "unauthenticated",
      user: undefined,
      exp: undefined,
      keepMeLoggedIn: false,
    });
  
    router.push("/auth/login");
  };

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
              icon: <UserOutlined />,
              label: "Ерөнхий мэдээлэл",
              onClick: () => {
                Router.push("/profile");
              },
            },
            {
              key: "2",
              icon: <SettingFilled />,
              label: "Нууц үг солих",
              onClick: () => {
                Router.push("/profile/password_update");
              },
            },
            {
              key: "3",
              icon: <LogoutIcon width={20} />,
              label: "Гарах",
              onClick: (e: any) => handleLogout(e),
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
            margin: "24px 16px",
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

export default ProfileLayout;
