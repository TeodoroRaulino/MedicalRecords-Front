import { useModalDeleteStore } from "@/store/modalDelete";
import { User } from "@/types/User";
import { EDIT_USER_URL } from "@/utils/constants";
import roles from "@/utils/roles";
import Link from "next/link";
import { FaTrash, FaEdit } from "react-icons/fa";
import ModalDelete from "./ModalDelete";

type UserProps = {
  user: User;
};

export default function Users({ user }: UserProps) {
  const { openModal } = useModalDeleteStore();

  const handleDeleteUser = () => {
    openModal(
      `/users/${user.id}`,
      `Você tem certeza que quer deletar o usuário ${user.name}?`
    );
  };

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
        </div>
      </div>
      <ModalDelete />
    </>
  );
}
