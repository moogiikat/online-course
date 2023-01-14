import { CourseRepository } from "common/services";
import { Course } from "common/models/course.model";
import { useState } from "react";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);

  const register = async (data: Course, onSuccess?: () => void) => {
    try {
      setIsLoading(true);
      const response = await CourseRepository.getInstance().create(data);
      onSuccess && onSuccess();
    } catch (error: any) {
      setError(`Систесийн алдаа. Алдааны код: [${error?.response?.status}]`);
    } finally {
      setIsLoading(false);
    }
  };
  return { error, isLoading, register, setError };
};
