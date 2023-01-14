import { AxiosError } from "axios";
import useSWR from "swr";

import { Content } from "common/models/content.model";
import { ContentRepository } from "common/services";

export const useGet = (id: string) => {
  const url = `/content/${id}`;
  const { data, error, mutate } = useSWR<Content, AxiosError>(
    id ? [id, url] : null,
    () => ContentRepository.getInstance().get(id),
    {
      revalidateOnFocus: false,
    }
  );

  return { data, error, mutate };
};
