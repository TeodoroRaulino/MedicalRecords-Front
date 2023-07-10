import { useEffect, useState } from "react";
import { MedicalRecordProps } from "@/types/MedicalRecord";
import { FaEllipsisH } from "react-icons/fa";
import { EDIT_MEDICAL_RECORD_URL } from "@/utils/constants";
import { useModalDeleteStore } from "@/store/modalDelete";
import ModalDelete from "./ModalDelete";
import { useRouter } from "next/router";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { useMoreInfoStore } from "@/store/moreInfo";

type Props = {
  medicalRecord: MedicalRecordProps;
};

export default function MedicalRecord({ medicalRecord }: Props) {
  const { openModal } = useModalDeleteStore();

  const { openAndSetId } = useMoreInfoStore();

  const router = useRouter();

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleEdit = () => {
    return router.push(EDIT_MEDICAL_RECORD_URL + `/${medicalRecord.id}`);
  };

  const handleDelete = () => {
    openModal(
      `/medical-records/${medicalRecord.id}`,
      "Você tem certeza que quer deletar a ficha médica de",
      `${medicalRecord.fullName}`
    );
  };

  useEffect(() => {
    if (medicalRecord.photo) {
      const blob = "data:image/jpeg;base64," + medicalRecord.photo;

      setImageSrc(blob);
    }
  }, [medicalRecord.photo]);

  return (
    <>
      <div className="bg-white p-5 shadow-md rounded-md">
        <div className="flex items-center justify-between mb-4">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Foto"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <img
              src={"/images/avatar.png"}
              alt="Foto"
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <h2 className="text-xl font-semibold px-1">Ficha Médica</h2>
          <div className="ml-10 mb-10 relative">
            <Menu
              menuButton={
                <MenuButton>
                  <FaEllipsisH className="text-gray-500 cursor-pointer" />
                </MenuButton>
              }
            >
              <div
                className="absolute top-0 right-0 bg-white border border-gray-200 rounded shadow"
                id="medical-record-menu"
              >
                <MenuItem
                  onClick={() => openAndSetId(medicalRecord.id)}
                  className="px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Informações
                </MenuItem>
                <MenuItem
                  onClick={handleEdit}
                  className="px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Editar
                </MenuItem>
                <MenuItem
                  onClick={handleDelete}
                  className="px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Excluir
                </MenuItem>
              </div>
            </Menu>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Informações Pessoais</h3>
          <p className="text-gray-700">
            <span className="font-semibold">Nome:</span>{" "}
            {medicalRecord.fullName}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">CPF:</span> {medicalRecord.cpf}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Telefone:</span>
            {medicalRecord.phoneNumber}
          </p>
        </div>
      </div>
      <ModalDelete />
    </>
  );
}
