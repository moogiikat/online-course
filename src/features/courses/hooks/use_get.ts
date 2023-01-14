import { AxiosError } from "axios";
import useSWR from "swr";

import { Course } from "common/models/course.model";
import { CourseRepository } from "common/services";

export const useGet = (id: string) => {
  const url = `/course/${id}`;
  const { data, error, mutate } = useSWR<Course, AxiosError>(
    id ? [id, url] : null,
    () => CourseRepository.getInstance().get(id),
    {
      revalidateOnFocus: false,
    }
  );

  return { data, error, mutate };
};
