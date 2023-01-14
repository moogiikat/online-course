import "tailwindcss/tailwind.css";
import "antd/dist/antd.css";
import "styles/globals.css";

import type { AppPropsWithLayout } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { useRedirect, useSession } from "common/recoil";
import { AuthRepository } from "common/services";
import dayjs from "dayjs";

const MOCApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);

  return <AppWrapper>{getLayout(<Component {...pageProps} />)}</AppWrapper>;
};

export default MOCApp;

const AppWrapper: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,user-scalable=no" />
      </Head>
      <RecoilRoot>
        <AuthWrapper>{children}</AuthWrapper>
      </RecoilRoot>
    </>
  );
};

const AuthWrapper: React.FC = ({ children }) => {
  const router = useRouter();
  const { setUrl } = useRedirect();
  const { session, setSession } = useSession();
  const noAuthPages = [
    "/auth/register",
    "/auth/login",
    "/",
    "/auth/reset-email",
  ];
  const checkSession = async () => {
    try {
      // get access token
      const response = await AuthRepository.getInstance().getAccessToken();

      if (response) {
        setSession({
          status: "authenticated",
          exp: response.access_token.exp,
          user: response.user,
        });
      } else {
        setSession({
          status: "unauthenticated",
        });
        // router.push("/auth/login");
      }
    } catch (error) {
      await AuthRepository.getInstance().logout();
      setSession({
        status: "unauthenticated",
      });
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    if (
      session.status === "unauthenticated" &&
      !noAuthPages.includes(router.pathname)
    ) {
      setUrl(router.pathname);
      router.push("/auth/login");
    } else {
      const now = dayjs(new Date());
      if (!session.exp || dayjs(session.exp) < now || !session.user) {
        checkSession();
      } else {
        router.push("/");
      }
    }
  }, [session.status]);

  if (session.status === "loading") {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        LOADING ...
      </div>
    );
  }

  return <>{children}</>;
};
