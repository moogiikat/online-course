import { useRouter } from "next/router";
import { useEffect } from "react";

import { useRedirect, useSession } from "common/recoil";

export const AuthRoute: React.FC = ({ children }) => {
  const { setUrl } = useRedirect();
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && router.pathname !== "/") {
      router.push("/");
    }
  }, [router, status, setUrl]);

  if (status === "unauthenticated") {
    return <>{children}</>;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      LOADING...
    </div>
  );
};
