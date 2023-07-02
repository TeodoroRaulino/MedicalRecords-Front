import Router from "next/router";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    Router.push("/auth/login");
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white"></div>
    </>
  );
}
