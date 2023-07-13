import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  data: number;
  filter?: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  data,
  filter,
  pageSize,
  currentPage,
  onPageChange,
}: Props) {
  const pagesCount =
    filter != undefined
      ? Math.ceil(filter / pageSize)
      : Math.ceil(data / pageSize);

  if (pagesCount === 1) return null;

  const visiblePages = 3;
  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + visiblePages - 1, pagesCount);

  if (endPage - startPage + 1 < visiblePages) {
    startPage = Math.max(endPage - visiblePages + 1, 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <>
      <nav className="flex justify-center py-10">
        <ul className="inline-flex -space-x-px">
          <li>
            <a
              onClick={() => onPageChange(1)}
              className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">First</span>
              ...
            </a>
          </li>
          {currentPage > 1 && (
            <>
              <li>
                <a
                  onClick={() => onPageChange(currentPage - 1)}
                  className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </li>
            </>
          )}

          {pages.map((page) => (
            <li key={page} className="flex justify-end">
              <a
                className={
                  page === currentPage
                    ? "z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            </li>
          ))}

          {currentPage < pagesCount && (
            <>
              <li>
                <a
                  onClick={() => onPageChange(currentPage + 1)}
                  className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </li>
            </>
          )}
          <li>
            <a
              onClick={() => onPageChange(pagesCount)}
              className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Last</span>
              ...
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export const paginate = (data: any, pageNumber: number, pageSize: number) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return data.slice(startIndex, startIndex + pageSize);
};
