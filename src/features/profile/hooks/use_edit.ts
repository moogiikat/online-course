import { AxiosResponse } from "axios";
import { AuthRepository } from "common/services";
import { useState } from "react";
import { User } from "common/models/user.model";

export const useEditProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);

  const EditProfile = async (
    id: string,
    data: User,
    onSuccess?: () => void
  ) => {
    try {
      setIsLoading(true);
      const response = await AuthRepository.getInstance().update(data);
      onSuccess && onSuccess();
    } catch (error: any) {
      setError(`Систесийн алдаа. Алдааны код: [${error?.response?.status}]`);
    } finally {
      setIsLoading(false);
    }
  };
  return { error, setError, isLoading, EditProfile };
};
