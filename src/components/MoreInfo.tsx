import { useMoreInfoStore } from "@/store/moreInfo";
import { MedicalRecordProps } from "@/types/MedicalRecord";

type Props = {
  medicalRecord: MedicalRecordProps;
};

export default function MoreInfo({ medicalRecord }: Props) {
  const { id, isOpen, close } = useMoreInfoStore();
  return (
    <>
      {medicalRecord.id === id && (
        <div
          className={`fixed inset-0 sm:inset-40 z-50 w-full h-full flex justify-center md:pt-10 ${
            !isOpen && "hidden"
          }`}
        >
          <div className="flex items-end justify-center min-h-screen md:w-1/4 pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              onClick={() => close()}
              className="fixed inset-0 transition-opacity bg-black opacity-75"
            ></div>
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {medicalRecord.fullName}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => close()}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6 space-y-6 flex flex-col items-center">
                <ul className="text-left text-white">
                  <li className="py-1">
                    <span className="font-semibold pr-2">Nome:</span>
                    {medicalRecord.fullName || "--"}
                  </li>
                  <li className="py-1">
                    <span className="font-semibold pr-2">CPF:</span>
                    {medicalRecord.cpf || "--"}
                  </li>
                  <li className="py-1">
                    <span className="font-semibold pr-2">Telefone:</span>
                    {medicalRecord.phoneNumber || "--"}
                  </li>
                  {medicalRecord?.street ? (
                    <li className="py-1">
                      <span className="font-semibold pr-2">Rua:</span>
                      {medicalRecord.street}
                    </li>
                  ) : (
                    <li className="py-1">
                      <span className="font-semibold pr-2">Rua:</span> {"--"}
                    </li>
                  )}
                  {medicalRecord?.city ? (
                    <li className="py-1">
                      <span className="font-semibold pr-2">Cidade:</span>
                      {medicalRecord.city}
                    </li>
                  ) : (
                    <li className="py-1">
                      <span className="font-semibold pr-2">Cidade:</span> {"--"}
                    </li>
                  )}
                  {medicalRecord?.state ? (
                    <li className="py-1">
                      <span className="font-semibold pr-2">Estado:</span>
                      {medicalRecord.state}
                    </li>
                  ) : (
                    <li className="py-1">
                      <span className="font-semibold pr-2">Estado:</span> {"--"}
                    </li>
                  )}

                  {medicalRecord?.postalCode ? (
                    <li className="py-1">
                      <span className="font-semibold pr-2">CEP:</span>
                      {medicalRecord.postalCode}
                    </li>
                  ) : (
                    <li className="py-1">
                      <span className="font-semibold pr-2">CEP:</span> {"--"}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
