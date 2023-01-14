import { AxiosResponse } from "axios";
import { ContentRepository } from "common/services";
import { useState } from "react";
import { Content } from "common/models/content.model";

export const useEditContent = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);

  const EditContent = async (
    id: string,
    data: Content,
    onSuccess?: (response: Content) => void
  ) => {
    try {
      setIsLoading(true);
      const response = await ContentRepository.getInstance().update(id, data);
      onSuccess && onSuccess(response);
    } catch (error: any) {
      setError(`Систесийн алдаа. Алдааны код: [${error?.response?.status}]`);
    } finally {
      setIsLoading(false);
    }
  };
  return { error, setError, isLoading, EditContent };
};
