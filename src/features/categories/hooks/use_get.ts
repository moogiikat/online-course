import { AxiosError } from "axios";
import useSWR from "swr";

import { Category } from "common/models/category.model";
import { CategoryRepository } from "common/services";

export const useGet = (id: string) => {
  const url = `/category/${id}`;
  const { data, error, mutate } = useSWR<Category, AxiosError>(
    id ? [id, url] : null,
    () => CategoryRepository.getInstance().get(id),
    {
      revalidateOnFocus: false,
    }
  );

  return { data, error, mutate };
};
