import axios from "axios";
import { CourseRepository } from "common/services";
import { useState } from "react";

export const useDelete = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);

  const deleteCourse = async (id: string, onSuccess?: () => void) => {
    try {
      setIsLoading(true);
      const response = await CourseRepository.getInstance().delete(id);
      onSuccess && onSuccess();
    } catch (error: any) {
      setError(`Систесийн алдаа. Алдааны код: [${error?.response?.status}]`);
    } finally {
      setIsLoading(false);
    }
  };

  return { error, isLoading, deleteCourse };
};
