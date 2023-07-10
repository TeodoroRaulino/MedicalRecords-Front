import SkeletonDashboard from "@/components/SkeletonDashboard";
import { Dashboard } from "@/layout/dashboard";
import API from "@/services/api";
import { userStore } from "@/store/user";
import { InfoDashboardProps } from "@/types/InfoDashboard";
import { DOCTOR_ROLE, MY_MEDICAL_RECORD_URL } from "@/utils/constants";
import roles from "@/utils/roles";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserFriends, FaNotesMedical, FaLaptopMedical } from "react-icons/fa";

const Index: NextPage = () => {
  const userName = userStore((state) => state.user.name);

  const userRole = userStore((state) => state.user.role);

  const [role, setRole] = useState("");

  const [name, setName] = useState("");

  const [InfoDashboard, setInfoDashboard] = useState<InfoDashboardProps | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const name = userName?.split(" ")[0];
      setName(name);

      const role = userRole;
      setRole(role);
    }
  }, [userName, userRole]);

  useEffect(() => {
    async function LoadInfoDashboard() {
      const response = await API.get("/users/dashboard").finally(() => {
        setIsLoading(false);
      });

      const data = response?.data;

      if (response?.status === 200) {
        setInfoDashboard(data);
      }
    }

    if (roles[userRole] === DOCTOR_ROLE) {
      LoadInfoDashboard();
    }
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen p-10 bg-white">
        <div className="flex flex-col items-center justify-center">
          <span className="text-5xl lg:text-6xl font-semibold text-gray-700">
            Olá{name ? `, ${name}` : ""}!
          </span>
          <span className="text-center text-4xl font-semibold text-gray-700 py-5">
            Bem vindo ao sistema de prontuários.
          </span>
        </div>

        {roles[role] === DOCTOR_ROLE ? (
          <div className="flex items-center justify-center text-teal-300 pt-10">
            {isLoading ? (
              <SkeletonDashboard />
            ) : (
              <div className="flex flex-col bg-gray-800 rounded-xl w-full px-5 py-5 pb-10">
                <span className="text-4xl font-semibold text-white py-5 px-10">
                  Informações
                </span>
                <div className="flex flex-col sm:flex-row justify-between px-10 py-5 gap-20">
                  <div className="flex flex-col items-start bg-gray-700 p-7 rounded-lg sm:w-1/3">
                    <div className="flex flex-row items-center justify-between w-full">
                      <span className="text-5xl font-semibold pb-3">
                        {InfoDashboard?.totalMedicalRecords}
                      </span>
                      <FaNotesMedical size={50} />
                    </div>
                    <span className="text-lg font-semibold">Prontuários</span>
                  </div>
                  <div className="flex flex-col items-start bg-gray-700 p-7 rounded-lg sm:w-1/3">
                    <div className="flex flex-row items-center justify-between w-full">
                      <span className="text-5xl font-semibold pb-3">
                        {InfoDashboard?.totalPatients}
                      </span>
                      <FaUserFriends size={50} />
                    </div>
                    <span className="text-lg font-semibold">Pacientes</span>
                  </div>
                  <div className="flex flex-col items-start bg-gray-700 p-7 rounded-lg sm:w-1/3">
                    <div className="flex flex-row items-center justify-between w-full">
                      <span className="text-5xl font-semibold pb-3">
                        {InfoDashboard?.totalDoctors}
                      </span>
                      <FaLaptopMedical size={50} />
                    </div>
                    <span className="text-lg font-semibold">Médicos</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-10">
            <div className="bg-gray-800 flex flex-row rounded-lg">
              <Link
                href={MY_MEDICAL_RECORD_URL}
                className="flex justify-center items-center p-5"
              >
                <FaNotesMedical size={24} />
                <span className="text-2xl font-semibold text-whitepy-5 px-10">
                  Acesse seu prontuário
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard(Index);
