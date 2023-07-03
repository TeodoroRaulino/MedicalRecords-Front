import { LOGIN_URL, TOKEN_STORAGE_KEY } from "@/utils/constants";
import { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Logout: NextPage = () => {
  useEffect(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    Router.push(LOGIN_URL);
    toast.success("Logout realizado com sucesso!");
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
        <h1 className="text-6xl text-blue-400 font-bold">
          Realizando logout...
        </h1>
      </div>
    </>
  );
};

export default Logout;
