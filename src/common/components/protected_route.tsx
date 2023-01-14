import { useRouter } from "next/router";
import { useEffect } from "react";

import { ERoles } from "common/enums";
import { useSession } from "common/recoil";

export const ProtectedRoute: React.FC<{ roles?: ERoles[] }> = ({
  children,
  roles,
}) => {
  const router = useRouter();
  const { session, setSession } = useSession();

  useEffect(() => {
    if (roles && !(session.user && roles.includes(session.user.role))) {
      router.push("/403");
    }
  }, [router, roles, session]);

  useEffect(() => {
    const currentDate = new Date();

    if (!session.exp || session.exp < currentDate.getTime() / 1000) {
      if (session.exp !== undefined) {
        // TODO: show toast
      }
      setSession({ status: "unauthenticated" });
    }
  }, [session.exp]);

  if (
    session.status === "authenticated" &&
    session.user &&
    session.user.role &&
    (!roles || roles.includes(ERoles.fromNumber(session.user.role.code)))
  ) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      403
    </div>
  );
};
