import { useModalDeleteStore } from "@/store/modalDelete";

export default function ModalDelete() {
  const isOpen = useModalDeleteStore((state) => state.isOpen);

  const modalContent = useModalDeleteStore((state) => state.modalContent);

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
        className="absolute inset-0 bg-gray-500 opacity-50"
        onClick={() => closeModal()}
      ></div>
      <div className="bg-white w-1/2 p-6 rounded-lg z-10">
        <p className="mb-4 text-black text-center py-5">{modalContent}</p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border rounded-lg border-gray-600"
            onClick={() => closeModal()}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 ml-4 text-sm font-medium text-white border bg-red-600 rounded-lg"
            onClick={confirmDeleteUser}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
