import MedicalRecord from "@/components/MedicalRecords";
import { Dashboard } from "@/layout/dashboard";
import API from "@/services/api";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MedicalRecordProps } from "@/types/MedicalRecord";
import MoreInfo from "@/components/MoreInfo";
import Pagination, { paginate } from "@/components/Pagination";

const Index: NextPage = () => {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecordProps[]>(
    []
  );

  const [filteredMedicalRecords, setFilteredMedicalRecords] = useState<
    MedicalRecordProps[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);

  const [searchType, setSearchType] = useState<"name" | "cpf">("name");

  const [searchValue, setSearchValue] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const PatientPerPage = 9;

  const patientPage = paginate(medicalRecords, currentPage, PatientPerPage);

  const patientPageFiltered = paginate(
    filteredMedicalRecords,
    currentPage,
    PatientPerPage
  );

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

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

  useEffect(() => {
    const filteredRecords = medicalRecords.filter((record) => {
      if (searchType === "name") {
        return record.fullName
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      } else if (searchType === "cpf") {
        return record.cpf.includes(searchValue);
      }

      return true;
    });
    setCurrentPage(1);
    setFilteredMedicalRecords(filteredRecords);
  }, [medicalRecords, searchType, searchValue]);

  return (
    <>
      <div className="w-full p-10 bg-white ">
        <div className="flex justify-between">
          <h1 className="text-6xl text-gray-500 font-bold">Prontuários</h1>
        </div>
        <div className="flex flex-row my-10 gap-5 text-black">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as "name" | "cpf")}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="name">Nome</option>
            <option value="cpf">CPF</option>
          </select>
          {searchType === "name" && (
            <input
              type="text"
              placeholder="Filtrar por nome"
              className="border border-gray-300 rounded-md p-2"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          )}
          {searchType === "cpf" && (
            <input
              type="text"
              placeholder="Filtrar por CPF"
              className="border border-gray-300 rounded-md p-2"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          )}
        </div>
        <div className="flex flex-row flex-wrap mt-10">
          {isLoading ? (
            <div>carregando...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-10 bg-white max-w-screen-xl mx-auto">
              {filteredMedicalRecords.length > 0
                ? patientPageFiltered.map(
                    (medicalRecord: MedicalRecordProps) => (
                      <div
                        key={medicalRecord.id}
                        className="flex flex-row font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <MedicalRecord medicalRecord={medicalRecord} />
                        <MoreInfo medicalRecord={medicalRecord} />
                      </div>
                    )
                  )
                : patientPage.map((medicalRecord: MedicalRecordProps) => (
                    <div
                      key={medicalRecord.id}
                      className="flex flex-row font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <MedicalRecord medicalRecord={medicalRecord} />
                      <MoreInfo medicalRecord={medicalRecord} />
                    </div>
                  ))}
            </div>
          )}
        </div>
        <Pagination
          data={
            filteredMedicalRecords.length > 0
              ? filteredMedicalRecords.length
              : medicalRecords.length
          }
          currentPage={currentPage}
          pageSize={PatientPerPage}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default Dashboard(Index);
