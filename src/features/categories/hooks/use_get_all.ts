import { AxiosError } from "axios";
import useSWR from "swr";

import { Category } from "common/models/category.model";
import { CategoryRepository } from "common/services";

export const useGetAll = () => {
  const url = `/category`;
  const { data, error, mutate } = useSWR<Category[], AxiosError>(
    url,
    () => CategoryRepository.getInstance().getMany(),
    {
      revalidateOnFocus: false,
    }
  );

  return { data, error, mutate };
};
