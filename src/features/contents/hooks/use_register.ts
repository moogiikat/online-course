import { ContentRepository } from "common/services";
import { Content } from "common/models/content.model";
import { useState } from "react";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);

  const register = async (
    data: Content,
    onSuccess?: () => void
  ) => {
    try {
      setIsLoading(true);
      const response = await ContentRepository.getInstance().create(data);
      onSuccess && onSuccess();
    } catch (error: any) {
      setError(`Систесийн алдаа. Алдааны код: [${error?.response?.status}]`);
    } finally {
      setIsLoading(false);
    }
  };
  return { error, isLoading, register, setError };
};
