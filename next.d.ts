import type { NextPage, NextPageWithLayout } from "next";
import type { AppProps } from "next/app";
import type { Router } from "next/dist/client/router";
import type { CompletePrivateRouteInfo } from "next/dist/shared/lib/router/router";
import type { ReactElement, ReactNode } from "react";

declare module "next" {
  export declare type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactElement<any, any> | null;
  };
}

declare module "next/app" {
  export declare type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
  };
}
