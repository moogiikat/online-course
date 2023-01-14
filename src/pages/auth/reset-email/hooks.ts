import { AxiosResponse } from "axios";
import { AuthRepository } from "common/services";
import { useState } from "react";

const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);

  const resetPassword = async (
    email: string,
    onSuccess?: (response: AxiosResponse) => void
  ) => {
    try {
      setIsLoading(true);
      const response = await AuthRepository.getInstance().passwordReset(email);
      onSuccess && onSuccess(response);
    } catch (error: any) {
      setError(`Систесийн алдаа. Алдааны код: [${error?.response?.status}]`);
    } finally {
      setIsLoading(false);
    }
  };
  return { error, setError, isLoading, resetPassword };
};

export default useResetPassword;
