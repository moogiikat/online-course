import { AxiosResponse } from "axios";
import { CategoryRepository } from "common/services";
import { useState } from "react";
import { Category } from "common/models/category.model";

export const useEditCategory = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);

  const EditCategory = async (
    id: string,
    data: Category,
    onSuccess?: (response: AxiosResponse) => void
  ) => {
    try {
      setIsLoading(true);
      const response = await CategoryRepository.getInstance().update(id, data);
      onSuccess && onSuccess(response);
    } catch (error: any) {
      setError(`Систесийн алдаа. Алдааны код: [${error?.response?.status}]`);
    } finally {
      setIsLoading(false);
    }
  };
  return { error, setError, isLoading, EditCategory };
};
