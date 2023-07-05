import { FaSpinner, FaSave } from "react-icons/fa";

type Props = {
  title?: string;
  loading?: boolean;
};

export default function Button({ title = "Salvar", loading = false }: Props) {
  return (
    <div className="col-span-5 sm:col-span-4" data-testid="button">
      <button
        type="submit"
        disabled={loading || false}
        className={`
        text-lg bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer flex items-center justify-center ${
          loading && "opacity-50"
        }
  `}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <FaSpinner className="mr-2 animate-spin" />
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <FaSave className="mr-2" />
          </span>
        )}
        <span>{title}</span>
      </button>
    </div>
  );
}
