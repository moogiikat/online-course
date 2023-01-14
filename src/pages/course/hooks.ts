import { CourseRepository } from "common/services";
import { useState, useEffect } from "react";
import useSWR from "swr";

const useGet = (id: string) => {
  const url = `/course`;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data, error, mutate } = useSWR(
    url,
    () => CourseRepository.getInstance().get(id),
    {
      revalidateOnFocus: false,
    }
  );
  useEffect(() => {
    console.log("data =>", data);
    if (data) setIsLoading(false);
  }, [data]);

  return { data, error, mutate, isLoading };
};

export default useGet;
