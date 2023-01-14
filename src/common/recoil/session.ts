import { User } from "common/models";
import produce from "immer";
import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";

type TStatus = "loading" | "authenticated" | "unauthenticated" | "newpass";
interface ISession {
  status: TStatus;
  user?: User;
  exp?: number;
  keepMeLoggedIn?: boolean;
}

const defaultState: ISession = {
  status: "loading",
};
const sessionState = atom<ISession>({
  key: "sessionState",
  default: defaultState,
});

const status = selector<TStatus>({
  key: "status",
  get: ({ get }) => {
    const { status } = get(sessionState);

    return status;
  },
  set: ({ set }, newValue) => {
    set(sessionState, (oldValue) => {
      return produce(oldValue, (draft) => {
        draft.status = newValue as TStatus;
      });
    });
  },
});

const user = selector<User | undefined>({
  key: "user",
  get: ({ get }) => {
    const { user } = get(sessionState);

    return user;
  },
  set: ({ set }, newValue) => {
    set(sessionState, (oldValue) => {
      return produce(oldValue, (draft) => {
        draft.user = newValue as User;
      });
    });
  },
});

export const useSession = () => {
  return {
    session: useRecoilValue(sessionState),
    setSession: useSetRecoilState(sessionState),
    status: useRecoilValue(status),
    setStatus: useSetRecoilState(status),
    user: useRecoilValue(user),
    setUser: useSetRecoilState(user),
  };
};
