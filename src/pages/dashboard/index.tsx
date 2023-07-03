import { Dashboard } from "@/layout/dashboard";
import { NextPage } from "next";

const Index: NextPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
        <h1 className="text-6xl text-blue-400 font-bold">Dashboard</h1>
      </div>
    </>
  );
};

export default Dashboard(Index);
