import { FaExclamationTriangle, FaTrash } from "react-icons/fa";

import { useModalDeleteStore } from "@/store/modalDelete";

export default function ModalDelete() {
  const isOpen = useModalDeleteStore((state) => state.isOpen);

  const modalContent = useModalDeleteStore((state) => state.modalContent);

  const itemToDelete = useModalDeleteStore((state) => state.itemToDelete);

  const deleteAction = useModalDeleteStore((state) => state.deleteAction);

  const closeModal = useModalDeleteStore((state) => state.closeModal);

  const confirmDeleteUser = async () => {
    await deleteAction();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        !isOpen && "hidden"
      }`}
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => closeModal()}
      ></div>
      <div className="bg-white w-1/2 p-6 rounded-lg z-10 flex flex-col justify-center items-center">
        <div className="flex items-center justify-center bg-yellow-500 rounded-lg w-1/6 py-2">
          <FaExclamationTriangle className="text-white text-4xl" />
        </div>
        <div className="flex items-center justify-center py-5">
          <p className="mb-4 text-black text-center py-5">
            {modalContent}
            <span className="pl-2 mb-4 text-black font-bold text-center py-5 text-lg">
              {itemToDelete} ?
            </span>
          </p>
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border rounded-lg border-gray-600"
            onClick={() => closeModal()}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 ml-4 text-sm font-medium text-white bg-red-600 rounded-lg flex items-center"
            onClick={confirmDeleteUser}
          >
            <span className="flex items-center">
              <FaTrash className="mr-2" />
            </span>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
