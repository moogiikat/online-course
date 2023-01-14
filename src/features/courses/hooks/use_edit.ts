import { AxiosResponse } from "axios";
import { CourseRepository } from "common/services";
import { useState } from "react";
import { Course } from "common/models/course.model";

export const useEditCourse = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);

  const EditCourse = async (
    id: string,
    data: Course,
    onSuccess?: (response: Course) => void
  ) => {
    try {
      setIsLoading(true);
      const response = await CourseRepository.getInstance().update(id, data);
      onSuccess && onSuccess(response);
    } catch (error: any) {
      setError(`Систесийн алдаа. Алдааны код: [${error?.response?.status}]`);
    } finally {
      setIsLoading(false);
    }
  };
  return { error, setError, isLoading, EditCourse };
};
