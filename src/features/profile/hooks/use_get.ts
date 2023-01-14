import { AxiosError } from "axios";
import useSWR from "swr";

import { User } from "common/models/user.model";
import { AuthRepository } from "common/services";

export const useGet = () => {
  const url = `/auth/me`;
  const { data, error, mutate } = useSWR<User, AxiosError>(
    url,
    () => AuthRepository.getInstance().getAuth(),
    {
      revalidateOnFocus: false,
    }
  );

  return { data, error, mutate };
};
