import { AxiosError } from "axios";
import useSWR from "swr";

import { Course } from "common/models/course.model";
import { CourseRepository } from "common/services";

export const useGetAll = () => {
  const url = `/course`;
  const { data, error, mutate } = useSWR<Course[], AxiosError>(
    url,
    () => CourseRepository.getInstance().getMany(),
    {
      revalidateOnFocus: false,
    }
  );

  return { data, error, mutate };
};
