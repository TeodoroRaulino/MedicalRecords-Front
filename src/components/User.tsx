import { useModalDeleteStore } from "@/store/modalDelete";
import { User } from "@/types/User";
import {
  CREATE_MEDICAL_RECORD_URL,
  EDIT_USER_URL,
  PATIENT_ROLE,
} from "@/utils/constants";
import roles from "@/utils/roles";
import Link from "next/link";
import { FaTrash, FaEdit, FaClipboardList } from "react-icons/fa";
import ModalDelete from "./ModalDelete";
import { useEffect, useState } from "react";
import API from "@/services/api";

type UserProps = {
  user: User;
};

export default function Users({ user }: UserProps) {
  const { openModal } = useModalDeleteStore();

  const [existesMedicalRecord, setExistesMedicalRecord] = useState(false);

  const [loading, setLoading] = useState(true);

  const handleDeleteUser = () => {
    openModal(
      `/users/${user.id}`,
      `Você tem certeza que quer deletar o usuário ${user.name}?`
    );
  };

  useEffect(() => {
    async function loadMedicalRecord() {
      try {
        setLoading(true);
        const response = await API.get(
          `/medical-records/user/${user.id}`
        ).finally(() => {
          setLoading(false);
        });
        if (response?.status === 200) {
          setExistesMedicalRecord(true);
        }
      } catch (error) {
        setExistesMedicalRecord(false);
      }
    }

    if (user && user.id && roles[user.role] === PATIENT_ROLE) {
      loadMedicalRecord();
    }
  }, [user]);

  return (
    <>
      <div className="px-6 py-3 w-1/4">
        <p className="text-gray-500">{user.name}</p>
      </div>
      <div className="px-6 py-3 w-1/4">
        <p className="text-gray-500">{user.email}</p>
      </div>
      <div className="px-6 py-3 w-1/4">
        <p className="text-gray-500 capitalize">{roles[user.role]}</p>
      </div>
      <div className="px-6 py-3 w-1/4">
        <div className="flex flex-row items-center justify-start">
          <Link href={`${EDIT_USER_URL}/${user.id}`}>
            <span className="flex items-center justify-center h-full w-10 text-gray-800">
              <FaEdit />
            </span>
          </Link>
          <button
            onClick={handleDeleteUser}
            className="flex items-center justify-center h-full w-10 text-red-600"
          >
            <FaTrash />
          </button>
          {existesMedicalRecord === false &&
            roles[user.role] === PATIENT_ROLE && (
              <Link href={CREATE_MEDICAL_RECORD_URL + `?userId=${user.id}`}>
                <span className="flex items-center justify-center h-full w-10 text-gray-800">
                  {loading ? null : <FaClipboardList />}
                </span>
              </Link>
            )}
        </div>
      </div>
      <ModalDelete />
    </>
  );
}
