import produce from "immer";
import {
  atom,
  selector,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";

interface IRedirect {
  url: string;
}

const defaultState: IRedirect = {
  url: "",
};
const redirectState = atom<IRedirect>({
  key: "redirectState",
  default: defaultState,
});

const redirectUrl = selector<string>({
  key: "redirectUrl",
  get: ({ get }) => {
    const { url } = get(redirectState);

    return url;
  },
  set: ({ set }, newValue) => {
    set(redirectState, (oldValue) => {
      return produce(oldValue, (draft) => {
        draft.url = newValue as string;
      });
    });
  },
});

export const useRedirect = () => {
  return {
    url: useRecoilValue(redirectUrl),
    setUrl: useSetRecoilState(redirectUrl),
    resetUrl: useResetRecoilState(redirectUrl),
  };
};
