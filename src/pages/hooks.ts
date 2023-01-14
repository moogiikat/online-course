import { useState, useEffect } from "react";
import useSWR from "swr";
import { CategoryRepository } from "common/services";

const useGet = () => {
  const url = `/category`;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data, error, mutate } = useSWR(
    url,
    () => CategoryRepository.getInstance().getMany(),
    {
      revalidateOnFocus: false,
    }
  );
  useEffect(() => {
    if (data) setIsLoading(false);
  }, [data]);

  return { data, error, mutate, isLoading };
};

export default useGet;
