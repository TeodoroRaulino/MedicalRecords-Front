import { Dashboard } from "@/layout/dashboard";
import API from "@/services/api";
import { MedicalRecordProps } from "@/types/MedicalRecord";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Index: NextPage = () => {
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecordProps | null>(
    null
  );

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function LoadMedicalRecord() {
      setIsLoading(true);

      const response = await API.get("/medical-records/my-medical-records")
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });

      const data = response?.data;

      if (response?.status === 200) {
        setMedicalRecord(data);
      }
    }

    LoadMedicalRecord();
  }, []);

  useEffect(() => {
    if (medicalRecord?.photo) {
      const blob = "data:image/jpeg;base64," + medicalRecord.photo;

      setImageSrc(blob);
    }
  }, [medicalRecord?.photo]);

  return (
    <>
      <div className="w-full p-10 bg-white ">
        <div className="flex justify-between">
          <h1 className="text-6xl text-gray-500 font-bold">Suas informações</h1>
        </div>
        <div className="flex flex-row flex-wrap justify-center mt-10">
          {isLoading ? (
            <div>carregando...</div>
          ) : (
            <div className="flex flex-col bg-gray-100 rounded-xl shadow-lg w-2/4 p-10">
              <div className="flex flex-row gap-10 items-center pb-5">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt="Foto"
                    className="w-24 h-auto rounded-full object-cover"
                  />
                ) : (
                  <img
                    src={"/images/avatar.png"}
                    alt="Foto"
                    className="w-24 h-auto rounded-full object-cover"
                  />
                )}
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold text-gray-500">
                    {medicalRecord?.fullName}
                  </h1>
                </div>
              </div>

              <div className="flex flex-col text-xl gap-2">
                <div className="flex flex-row bg-white rounded-lg w-full py-2 px-4">
                  <h1 className="font-bold text-gray-500">CPF:</h1>
                  <h1 className="text-gray-500 pl-3">{medicalRecord?.cpf}</h1>
                </div>

                <div className="flex flex-row bg-white rounded-lg w-full py-2 px-4">
                  <h1 className="font-bold text-gray-500">Telefone: </h1>
                  <h1 className="text-gray-500 pl-3">
                    {medicalRecord?.phoneNumber}
                  </h1>
                </div>

                <h1 className="font-bold text-gray-500 text-2xl pt-2">
                  Endereço
                </h1>

                <div className="flex flex-row bg-white rounded-lg w-full py-2 px-4">
                  <h1 className="font-bold text-gray-500">Rua:</h1>
                  <h1 className="text-gray-500 pl-3">
                    {medicalRecord?.address
                      ? medicalRecord.address.street
                      : "--"}
                  </h1>
                </div>

                <div className="flex flex-row bg-white rounded-lg w-full py-2 px-4">
                  <h1 className="font-bold text-gray-500">Bairro</h1>
                  <h1 className="text-gray-500 pl-3">
                    {medicalRecord?.address
                      ? medicalRecord.address.neighborhood
                      : "--"}
                  </h1>
                </div>

                <div className="flex flex-row bg-white rounded-lg w-full py-2 px-4">
                  <h1 className="font-bold text-gray-500">Cidade:</h1>
                  <h1 className="text-gray-500 pl-3">
                    {medicalRecord?.address ? medicalRecord.address.city : "--"}
                  </h1>
                </div>

                <div className="flex flex-row bg-white rounded-lg w-full py-2 px-4">
                  <h1 className="font-bold text-gray-500">Estado:</h1>
                  <h1 className="text-gray-500 pl-3">
                    {medicalRecord?.address
                      ? medicalRecord.address.state
                      : "--"}
                  </h1>
                </div>

                <div className="flex flex-row bg-white rounded-lg w-full py-2 px-4">
                  <h1 className="font-bold text-gray-500">CEP:</h1>
                  <h1 className="text-gray-500 pl-3">
                    {medicalRecord?.address
                      ? medicalRecord.address.postalCode
                      : "--"}
                  </h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard(Index);
