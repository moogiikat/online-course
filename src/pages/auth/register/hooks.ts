import { AuthRepository } from "common/services";
import { TRegisterRequest, TRegisterResponse } from "common/types/auth.type";
import { useState } from "react";

const useRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);

  const register = async (
    data: TRegisterRequest,
    onSuccess?: (response: any) => void
  ) => {
    try {
      setIsLoading(true);
      const response = await AuthRepository.getInstance().register(data);
      onSuccess && onSuccess(response);
    } catch (error: any) {
      setError(`Систесийн алдаа. Алдааны код: [${error?.response?.status}]`);
    } finally {
      setIsLoading(false);
    }
  };
  return { error, isLoading, register, setError };
};

export default useRegister;
