import { UserIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, Fragment } from "react";
import { useSession } from "common/recoil";
import { AuthRepository, BackendClient } from "common/services";
import { Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

export const Header: React.FC = () => {
  const router = useRouter();
  const { session, setSession } = useSession();

  const handleReset = () => {
    router.push("/");
  };

  // const handleLogout = async (event: FormEvent) => {
  //   // Logout logic code is also here. => features.auth.pages.change_password.tsx
  //   await AuthRepository.getInstance()
  //     .logout()
  //     .then(() => {
  //       BackendClient.getInstance().defaults.headers.common.Authorization = ``;
  //     });

  //   setSession({
  //     status: "unauthenticated",
  //     user: undefined,
  //     exp: undefined,
  //     keepMeLoggedIn: false,
  //   });

  //   router.push("/auth/login");
  // };

  // const menu = (
  //   <Menu
  //     items={[
  //       {
  //         key: "1",
  //         label: <a href="/auth/profile">Хувийн мэдээлэл</a>,
  //       },
  //       {
  //         key: "-",
  //         label: <a onClick={(e) => handleLogout(e)}>Гарах</a>,
  //       },
  //     ]}
  //   />
  // );

  return (
    <div className="flex px-40 h-[70px] border-b border-b-slate-200 bg-white fixed z-10 w-full">
      <div className="my-2.5">
        <Image
          src={"/assets/logo/logo.png"}
          width={40}
          height={40}
          onClick={handleReset}
          className={`cursor-pointer`}
        />
      </div>
      <div className="grow"></div>
      <div className="pt-6">
        {session.status == "authenticated" && session.user ? (
          <div className="space-x-4 flex">
            <a href="/about-us">Бидний тухай</a>
            <a href="/contact">Холбоо барих</a>
            {session.user.role === "ADMIN" && <a href="/admin">Админ</a>}
            <a href="/profile" className="content-start">
              <UserIcon width={20} />
            </a>
            {/* <Dropdown overlay={menu}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {session.user?.name || "Хэрэглэгч"}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown> */}
          </div>
        ) : (
          <>
            <div className="space-x-4 flex">
              <a href="/about-us">Бидний тухай</a>
              <a href="/contact">Холбоо барих</a>
              <a href="/auth/login">Нэвтрэх</a>
              <a href="/auth/register">Бүртгүүлэх</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
