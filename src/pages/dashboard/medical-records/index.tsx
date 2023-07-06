import MedicalRecord from "@/components/MedicalRecords";
import { Dashboard } from "@/layout/dashboard";
import API from "@/services/api";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MedicalRecordProps } from "@/types/MedicalRecord";
import MoreInfo from "@/components/MoreInfo";

const Index: NextPage = () => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecordProps[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function LoadUser() {
      setIsLoading(true);

      const response = await API.get("/medical-records")
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });

      const data = response?.data;

      if (response?.status === 200) {
        setMedicalRecords(data);
      }
    }

    LoadUser();
  }, []);

  return (
    <>
      <div className="w-full p-10 bg-white ">
        <div className="flex justify-between">
          <h1 className="text-6xl text-gray-500 font-bold">Prontuários</h1>
        </div>
        <div className="flex flex-row flex-wrap mt-10">
          {isLoading ? (
            <div>carregando...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-10 bg-white max-w-screen-xl mx-auto">
              {medicalRecords.map(
                (medicalRecord: MedicalRecordProps, index) => (
                  <div
                    key={index}
                    className="flex flex-row font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <MedicalRecord medicalRecord={medicalRecord} />
                    <MoreInfo medicalRecord={medicalRecord} />
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard(Index);
