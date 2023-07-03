import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthToken } from "@/services/authToken";
import { toast } from "react-toastify";
import { NextPage } from "next";
import { LOGIN_URL } from "@/utils/constants";

export function protectedRoute(Page: any) {
  const ProtectedRoute: NextPage<any> = () => {
    const router = useRouter();
    const token = AuthToken.fromStorage();

    useEffect(() => {
      if (!token) {
        toast.error("Você precisar estar logado ou seu token expirou!");
        router.push(LOGIN_URL);
      }
    }, []);

    return <Page />;
  };

  return ProtectedRoute;
}
