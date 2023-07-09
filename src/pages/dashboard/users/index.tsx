import Users from "@/components/User";
import { Dashboard } from "@/layout/dashboard";
import API from "@/services/api";
import { User } from "@/types/User";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Index: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");

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
          <h1 className="text-6xl text-gray-500 font-bold">Users</h1>
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
                {filteredUsers.map((user: User, index) => (
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
      </div>
    </>
  );
};

export default Dashboard(Index);
