import { AuthRepository } from "common/services";
import { TLoginRequest, TLoginResponse } from "common/types";
import { useState } from "react";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);

  const login = async (
    data: TLoginRequest,
    onSuccess?: (response: TLoginResponse) => void
  ) => {
    try {
      setIsLoading(true);
      const response = await AuthRepository.getInstance().login(data);
      onSuccess && onSuccess(response);
    } catch (error: any) {
      switch (error.response?.status) {
        case 401:
          setError("Имэйл хаяг эсвэл нууц үг буруу байна.");
          break;
        default:
          setError(
            `Систесийн алдаа. Алдааны код: [${error?.response?.status}]`
          );
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { error, isLoading, login, setError };
};

export default useLogin;
