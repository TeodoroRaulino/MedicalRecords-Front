import Users from "@/components/User";
import { Dashboard } from "@/layout/dashboard";
import API from "@/services/api";
import { User } from "@/types/User";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Pagination, { paginate } from "@/components/Pagination";

const Index: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [filter, setFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 8;

  const userPage = paginate(users, currentPage, usersPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    if (filter === "") {
      return user;
    } else {
      return user.role === parseInt(filter);
    }
  });

  const userPageFiltered = paginate(filteredUsers, currentPage, usersPerPage);

  useEffect(() => {
    async function LoadUser() {
      setIsLoading(true);

      const response = await API.get("/users")
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });

      const data = response?.data;

      if (response?.status === 200) {
        setUsers(data);
      }
    }

    LoadUser();
  }, []);

  return (
    <>
      <div className="w-full p-10 bg-white">
        <div className="flex justify-between">
          <h1 className="text-6xl text-gray-500 font-bold">Usuários</h1>
          <Link href="/dashboard/users/create">
            <button className="flex items-center justify-center w-32 h-12 bg-green-600 text-white rounded-md">
              Criar
            </button>
          </Link>
        </div>
        <div className="flex flex-col mt-10">
          <div className="bg-white divide-y divide-gray-200">
            <div className="flex justify-end mb-4">
              <label htmlFor="userTypeFilter" className="mr-2">
                Tipo de Usuário:
              </label>
              <select
                id="userTypeFilter"
                value={filter}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-md py-1 px-2 text-black"
              >
                <option value="">Todos</option>
                <option value={0}>Doutor</option>
                <option value={1}>Paciente</option>
              </select>
            </div>

            <div className="w-full h-full overflow-x-auto">
              <div className="min-w-[760px] md:min-w-full mx-auto">
                <div className="flex flex-row font-medium text-gray-500 uppercase tracking-wider">
                  <div className="px-6 py-3 w-1/4">Name</div>
                  <div className="px-6 py-3 w-1/4">Email</div>
                  <div className="px-6 py-3 w-1/4">Cargo</div>
                  <div className="px-6 py-3 w-1/4">Ações</div>
                </div>

                {isLoading ? (
                  <div>carregando...</div>
                ) : (
                  <div className="bg-white">
                    {filter.length > 0
                      ? userPageFiltered.map((user: User, index: number) => (
                          <div
                            key={index}
                            className={`${
                              index % 2 === 0 ? "bg-gray-50" : "bg-gray-200"
                            } px-6 py-3 flex items-center`}
                          >
                            <Users user={user} />
                          </div>
                        ))
                      : userPage.map((user: User, index: number) => (
                          <div
                            key={index}
                            className={`${
                              index % 2 === 0 ? "bg-gray-50" : "bg-gray-200"
                            } px-6 py-3 flex items-center`}
                          >
                            <Users user={user} />
                          </div>
                        ))}
                  </div>
                )}
              </div>
            </div>

            <Pagination
              data={filter.length > 0 ? filter.length : users.length}
              currentPage={currentPage}
              pageSize={usersPerPage}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard(Index);
